import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const dbPath = path.resolve(__dirname, 'data.db');

app.use(cors());
app.use(express.json());

let db;

async function initDb() {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      serviceType TEXT,
      packageType TEXT,
      weight REAL,
      length REAL,
      width REAL,
      height REAL,
      originCountry TEXT,
      originCity TEXT,
      destinationCountry TEXT,
      destinationCity TEXT,
      shipmentDate TEXT,
      insurance INTEGER,
      name TEXT,
      email TEXT,
      phone TEXT,
      company TEXT,
      baseRate REAL,
      insuranceAmount REAL,
      tax REAL,
      total REAL,
      createdAt TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS shipments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      trackingNumber TEXT UNIQUE,
      status TEXT,
      serviceType TEXT,
      weight REAL,
      origin TEXT,
      destination TEXT,
      estimatedDelivery TEXT,
      events TEXT,
      createdAt TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      createdAt TEXT
    );
  `);

  const existingSample = await db.get('SELECT id FROM shipments WHERE trackingNumber = ?', 'TRK-2024-8492');
  if (!existingSample) {
    const sampleShipment = {
      trackingNumber: 'TRK-2024-8492',
      status: 'delivered',
      serviceType: 'Express Delivery',
      weight: 2.5,
      origin: 'New York, NY',
      destination: 'Boston, MA',
      estimatedDelivery: '2026-05-11',
      events: JSON.stringify([
        { label: 'Delivered', location: 'Boston, MA — Customer Location', date: 'May 11, 2026', time: '02:30 PM', description: 'Package delivered successfully. Signed by J. Smith', state: 'completed' },
        { label: 'Out for Delivery', location: 'Boston Hub — Delivery Vehicle', date: 'May 11, 2026', time: '08:15 AM', description: 'Package is out for delivery', state: 'completed' },
        { label: 'Arrived at Facility', location: 'Boston Distribution Center', date: 'May 11, 2026', time: '06:00 AM', description: 'Package arrived at local distribution center', state: 'completed' },
        { label: 'In Transit', location: 'Philadelphia Hub', date: 'May 10, 2026', time: '11:45 PM', description: 'Package in transit to destination city', state: 'completed' },
        { label: 'Package Picked Up', location: 'New York Distribution Center', date: 'May 10, 2026', time: '09:30 AM', description: 'Package picked up and processed', state: 'completed' },
      ]),
      createdAt: new Date().toISOString(),
    };
    await db.run(`
      INSERT INTO shipments (trackingNumber, status, serviceType, weight, origin, destination, estimatedDelivery, events, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, sampleShipment.trackingNumber, sampleShipment.status, sampleShipment.serviceType, sampleShipment.weight, sampleShipment.origin, sampleShipment.destination, sampleShipment.estimatedDelivery, sampleShipment.events, sampleShipment.createdAt);
  }
}

app.get('/api/track/:trackingNumber', async (req, res) => {
  const trackingNumber = String(req.params.trackingNumber || '').trim().toUpperCase();
  if (!trackingNumber) {
    return res.status(400).json({ error: 'Tracking number is required.' });
  }
  const shipment = await db.get('SELECT * FROM shipments WHERE trackingNumber = ?', trackingNumber);
  if (!shipment) {
    return res.status(404).json({ error: 'Shipment not found.' });
  }
  shipment.events = JSON.parse(shipment.events);
  return res.json(shipment);
});

app.post('/api/quote', async (req, res) => {
  const payload = req.body;
  const required = ['serviceType', 'packageType', 'weight', 'originCountry', 'originCity', 'destinationCountry', 'destinationCity', 'shipmentDate', 'name', 'email', 'phone'];
  for (const field of required) {
    if (!payload[field]) {
      return res.status(400).json({ error: `${field} is required.` });
    }
  }

  const baseRate = payload.serviceType === 'express' ? 89.99 : payload.serviceType === 'standard' ? 49.99 : 29.99;
  const insuranceAmount = payload.insurance ? 15 : 0;
  const tax = Number(((baseRate + insuranceAmount) * 0.08).toFixed(2));
  const total = Number((baseRate + insuranceAmount + tax).toFixed(2));
  const createdAt = new Date().toISOString();

  const result = await db.run(
    `INSERT INTO quotes (serviceType, packageType, weight, length, width, height, originCountry, originCity, destinationCountry, destinationCity, shipmentDate, insurance, name, email, phone, company, baseRate, insuranceAmount, tax, total, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    payload.serviceType,
    payload.packageType,
    payload.weight,
    payload.dimensions?.length || null,
    payload.dimensions?.width || null,
    payload.dimensions?.height || null,
    payload.originCountry,
    payload.originCity,
    payload.destinationCountry,
    payload.destinationCity,
    payload.shipmentDate,
    payload.insurance ? 1 : 0,
    payload.name,
    payload.email,
    payload.phone,
    payload.company || null,
    baseRate,
    insuranceAmount,
    tax,
    total,
    createdAt
  );

  return res.json({
    id: result.lastID,
    serviceType: payload.serviceType,
    packageType: payload.packageType,
    weight: payload.weight,
    dimensions: payload.dimensions || {},
    originCountry: payload.originCountry,
    originCity: payload.originCity,
    destinationCountry: payload.destinationCountry,
    destinationCity: payload.destinationCity,
    shipmentDate: payload.shipmentDate,
    insurance: payload.insurance,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    company: payload.company,
    baseRate,
    insuranceAmount,
    tax,
    total,
    createdAt,
  });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const createdAt = new Date().toISOString();
  const result = await db.run(
    `INSERT INTO contacts (name, email, phone, message, createdAt) VALUES (?, ?, ?, ?, ?)`,
    name,
    email,
    phone || null,
    message,
    createdAt
  );

  return res.json({ id: result.lastID, name, email, phone, message, createdAt });
});

const staticDir = path.resolve(__dirname, '../dist');
app.use(express.static(staticDir));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(staticDir, 'index.html'));
});

const port = process.env.PORT || 4000;
initDb().then(() => {
  app.listen(port, () => {
    console.log(`SQLite demo server listening on http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

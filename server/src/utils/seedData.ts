import mongoose from 'mongoose';
import { Article } from '../models/Article';

const sampleArticles = [
  {
    title: 'Quantum Computing Break-Through Promises Unprecedented Processing Speed',
    slug: 'quantum-computing-breakthrough-2026',
    summary: 'Researchers demonstrate a 100-qubit fault-tolerant system capable of executing complex simulations in seconds.',
    content: `Scientists at the International Quantum Research Center have achieved a monumental breakthrough in quantum error correction. Using a novel topological qubit architecture, the team successfully maintained quantum coherence over thousands of operations.

    This achievement paves the way for commercial applications in drug discovery, materials science, and cryptography. Industry experts estimate that quantum simulation tools could shorten molecular research timelines from years to days.

    "We are entering an era where computational barriers that have constrained human innovation for centuries are dissolving," said Dr. Elena Rostova, lead researcher on the project. "The practical implications for healthcare and energy storage are immense."`,
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    author: 'Alexander Vance',
    tags: ['Quantum', 'Technology', 'Science', 'Innovation'],
    viewsCount: 1420,
    readTimeMinutes: 4,
    isBreaking: true,
  },
  {
    title: 'Global Renewable Energy Output Exceeds Fossil Fuels for First Time',
    slug: 'global-renewable-energy-record-2026',
    summary: 'Solar, wind, and hydroelectric generation reached 51% of global grid supply during the third quarter.',
    content: `In a landmark shift for the global energy transition, renewable sources contributed more than half of the world's electricity grid supply during Q3. Rapid deployments of next-generation solar efficiency modules and offshore wind farms drove the record-breaking quarter.

    Governments across North America, Europe, and Asia-Pacific have accelerated grid modernization investments, allowing higher capacities of clean energy to integrate seamlessly without stability loss.

    Financial analysts note that clean energy technology investments have officially outpaced legacy energy exploration for three consecutive years.`,
    category: 'World',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    author: 'Sarah Jenkins',
    tags: ['Energy', 'Environment', 'World', 'Climate'],
    viewsCount: 980,
    readTimeMinutes: 3,
    isBreaking: true,
  },
  {
    title: 'Central Banks Announce Framework for Interoperable Digital Currency Settlement',
    slug: 'central-banks-digital-currency-framework',
    summary: 'Major financial institutions align on cross-border settlement protocols to lower transaction costs.',
    content: `A coalition of major central banks has finalized a unified protocol framework designed to enable instantaneous cross-border currency settlements. The new architecture aims to reduce transaction settlement times from days to milliseconds while maintaining strict compliance and auditability.

    The initiative addresses long-standing inefficiencies in international trade and remittance, potentially saving global businesses over $100 billion annually in transaction friction and currency exchange fees.`,
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    author: 'Marcus Sterling',
    tags: ['Business', 'Finance', 'Economy', 'Banking'],
    viewsCount: 750,
    readTimeMinutes: 5,
    isBreaking: false,
  },
  {
    title: 'Next-Generation Webb Telescope Captures Atmosphere of Earth-Sized Exoplanet',
    slug: 'webb-telescope-exoplanet-atmosphere-discovery',
    summary: 'Spectroscopic data reveals water vapor and nitrogen compounds surrounding LHS 475 b.',
    content: `Astronomers utilizing the James Webb Space Telescope have published extraordinary new spectroscopic observations of an Earth-sized exoplanet located 41 light-years away.

    The observations confirm atmospheric components including water vapor, carbon dioxide, and nitrogen traces. While surface temperatures remain high, the discovery provides critical methodology for analyzing potentially habitable rocky worlds in nearby stellar systems.`,
    category: 'Science',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Emily Watson',
    tags: ['Space', 'Science', 'Astronomy', 'Webb'],
    viewsCount: 1890,
    readTimeMinutes: 4,
    isBreaking: false,
  },
  {
    title: 'Autonomous Transportation Network Expands Across Three Major Metropolitan Regions',
    slug: 'autonomous-transportation-network-expansion',
    summary: 'Fully driverless commercial transit fleets register over 10 million safe passenger miles.',
    content: `Metropolitan transit authorities have officially integrated autonomous electric shuttles into core urban transit corridors. Operating on dedicated smart-lane infrastructure, the vehicles have maintained a 99.8% safety rating over 10 million vehicle-miles.

    Commuters report reduced travel times during peak traffic hours, while city planners highlight significant reductions in urban congestion and local emissions.`,
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
    author: 'David Chen',
    tags: ['Technology', 'Transit', 'AI', 'SmartCities'],
    viewsCount: 620,
    readTimeMinutes: 3,
    isBreaking: false,
  },
  {
    title: 'International Cultural Summit Unveils AI Archival Restoration Initiative',
    slug: 'cultural-summit-ai-archival-restoration',
    summary: 'Museums worldwide collaborate to restore and digitize centuries of fragile historical manuscripts.',
    content: `A consortium of national libraries and cultural heritage organizations has launched a global project using specialized vision AI algorithms to restore damaged ancient texts.

    The software can reconstruct missing text passages with high historical accuracy by analyzing linguistic patterns and ink density across thousands of related historical manuscripts.`,
    category: 'Culture',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
    author: 'Clara Moreau',
    tags: ['Culture', 'History', 'Art', 'AI'],
    viewsCount: 430,
    readTimeMinutes: 3,
    isBreaking: false,
  }
];

export const seedDatabaseIfEmpty = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('[Database Info] Skipping seeder: MongoDB not connected.');
      return;
    }
    const count = await Article.countDocuments();
    if (count === 0) {
      console.log('Seeding initial news articles into database...');
      await Article.insertMany(sampleArticles);
      console.log('Database successfully seeded with initial news articles.');
    }
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};

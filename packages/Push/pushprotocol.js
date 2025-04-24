"use client"
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from 'ethers';

export const initializePushProtocol = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_INFURA_URL || "https://sepolia.infura.io/v3/2QvY7pMMCwBjGKUF96Km0QsRN8g"
    );
    
    if (!process.env.PRIVATE_KEY) {
      throw new Error("Private key not found in environment variables");
    }

    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const protocol = await PushAPI.initialize(signer, { 
      env: CONSTANTS.ENV.STAGING 
    });

    return protocol;
  } catch (error) {
    console.error("Failed to initialize Push Protocol:", error);
    throw error;
  }
};

export const sendNotification = async (protocol, title, body) => {
  try {
    const response = await protocol.channel.send(['*'], {
      notification: {
        title,
        body,
      }
    });
    return response;
  } catch (error) {
    console.error("Failed to send notification:", error);
    throw error;
  }
};

// pages/api/sendNotification.js
import { initializePushProtocol, sendNotification } from '../../utils/pushProtocol';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { title, body } = req.body;
    
    if (!title || !body) {
      return res.status(400).json({ message: 'Title and body are required' });
    }

    const protocol = await initializePushProtocol();
    const response = await sendNotification(protocol, title, body);
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
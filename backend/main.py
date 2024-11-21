from fastapi import FastAPI, WebSocket, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import asyncio
import uvicorn

from models import Base, engine
from routers import agents, campaigns, calls, reports
from services import asterisk_service, websocket_manager

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Contact Center API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(agents.router, prefix="/api/agents", tags=["agents"])
app.include_router(campaigns.router, prefix="/api/campaigns", tags=["campaigns"])
app.include_router(calls.router, prefix="/api/calls", tags=["calls"])
app.include_router(reports.router, prefix="/api/reports", tags=["reports"])

# WebSocket connection manager
manager = websocket_manager.ConnectionManager()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            # Process incoming WebSocket messages
            await manager.broadcast(f"Client {client_id}: {data}")
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await manager.disconnect(websocket, client_id)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
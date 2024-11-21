import asyncio
from panoramisk import Manager
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class AsteriskService:
    def __init__(self):
        self.manager = Manager(
            host='localhost',
            port=5038,
            username='admin',
            secret='secret'
        )
        self.connected = False

    async def connect(self):
        try:
            await self.manager.connect()
            self.connected = True
            logger.info("Connected to Asterisk AMI")
        except Exception as e:
            logger.error(f"Failed to connect to Asterisk AMI: {e}")
            self.connected = False

    async def originate_call(self, extension: str, context: str, channel: str) -> Dict[str, Any]:
        if not self.connected:
            await self.connect()
        
        try:
            response = await self.manager.send_action({
                'Action': 'Originate',
                'Channel': channel,
                'Context': context,
                'Exten': extension,
                'Priority': 1,
                'Async': 'yes'
            })
            return {'success': True, 'response': response}
        except Exception as e:
            logger.error(f"Failed to originate call: {e}")
            return {'success': False, 'error': str(e)}

    async def get_queue_status(self) -> Dict[str, Any]:
        if not self.connected:
            await self.connect()
        
        try:
            response = await self.manager.send_action({
                'Action': 'QueueStatus'
            })
            return {'success': True, 'queues': response}
        except Exception as e:
            logger.error(f"Failed to get queue status: {e}")
            return {'success': False, 'error': str(e)}

asterisk_service = AsteriskService()
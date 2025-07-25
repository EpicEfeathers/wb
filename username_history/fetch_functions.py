import aiohttp
import asyncio
import traceback

async def parse_response(resp):
    """
    If JSON return JSON,
    else return text
    """
    try: # if JSON
        return await resp.json()
    except aiohttp.ContentTypeError:
        return await resp.text()

async def fetch(session, url, retries=5, pause=2):
    '''
    Fetches the specified url
    '''
    for attempt in range(retries):
        try:
            async with session.get(url, timeout=60) as response:
                if response.status != 200:
                    text = await response.text()
                    print(f"[HTTP ERROR] {response.status} when fetching URL: {url}")
                    print(f"[HTTP ERROR] Response body:\n{text}")
                    last_exception = Exception(f"HTTP {response.status}: {text}")
                    continue
                
                return await parse_response(response)
            
        except aiohttp.ClientResponseError as e:
            print(f"[HTTP ERROR] {e.status} when fetching URL: {url}")
            last_exception = e
        except aiohttp.ClientConnectorError as e:
            print(f"[CONNECTION ERROR] Could not connect to {url}: {e}")
            last_exception = e
        except asyncio.TimeoutError as e:
            print(f"[TIMEOUT] Timed out while fetching {url}")
            last_exception = e
        except Exception as e:
            print(f"[UNHANDLED ERROR] {e.__class__.__name__} while fetching {url}")
            traceback.print_exc()
            last_exception = e

        if attempt < (retries - 1):
            await asyncio.sleep(pause)
        else:
            raise Exception(f"[ERROR] Failed to fetch url \"{url}\" \n\nException: {last_exception}")
        

async def check_api_health(session):
    try:
        resp = await fetch(session, "https://wbapi.wbpjs.com/ping")
        if resp == "pong!":
            print("[INFO] API is up and running! Continuing with squad fetching.")
            return True
        else:
            raise Exception(f"[ERROR] Unexpected ping response: {resp}")
    except Exception as e:
        raise Exception(f"[ERROR] API ping request failed: {e}")
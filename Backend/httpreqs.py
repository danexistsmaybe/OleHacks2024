import requests
import urllib.request
from datetime import datetime

DEFAULTHEADERS = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "Windows",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": '1',
    "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def httplog(msg):
    file = open("httplog.txt",'a')
    file.write(datetime.today().strftime('%Y-%m-%d %H:%M:%S') + ": " + msg+'\n')
    file.close()

# Makes urls more palitable (REMOVES ALL GET DATA, returns None if url is not explorable)
def sanitize(url,domain):
    if url in [None,""] or url[0] not in ['h','/']: return None
    url = url.split('?')[0]
    if url[0]=='/':
        url = domain + url
    if url[len(url)-1]=='/':
        url = url[0:len(url)-1]
    return url


class HTTPResponse:
    def __init__(self,t,s_c=200):
        self.text = t
        self.status_code=s_c

class Session:
    def __init__(self):
        self.session = requests.Session()

    def get(self,url,heads=DEFAULTHEADERS):
        # REQUESTS W/ SESSION
        resp = self.session.get(url,headers=heads)
        if resp.status_code==200:
            return HTTPResponse(resp.text,200)
        elif resp.status_code not in [403,404]:
            httplog("Got "+str(resp.status_code)+" from request to "+url+" with requests library, using sessions. Continuing as normal.")
            return HTTPResponse(resp.text,resp.status_code)
        else:
            # URLLIB.REQUEST W/ SESSION
            httplog("Got "+str(resp.status_code)+" from request to "+url+" with requests library, using sessions.")
            httplog("   Headers used: "+str(heads))
            code = resp.status_code
            if heads=={}: req = urllib.request.Request(url)
            else: req = urllib.request.Request(url,heads)
            resp = urllib.request.urlopen(req)
            if resp.status==code or resp.status in [403,404]:
                httplog("Got "+str(resp.status_code)+" from request to "+url+" with urllib.request library with same headers.")
                
                if resp.url!=url:
                    httplog("   Redirect took place in the previous request. Redirected to: "+resp.url)
                
                print("Starting new session.")
                self.session = requests.Session()
                resp = self.session.get(url,headers=heads)
                if resp.status_code in [403,404]:
                    httplog("   Got "+str(resp.status_code)+" from request to "+url+" with requests library after starting a new session.")
                    resp = requests.get(url,headers=heads)
                    if resp.status_code not in [403,404]:
                        return HTTPResponse(resp.text,resp.status_code)
                    return HTTPResponse(resp.text,code)
            else:
                return HTTPResponse(resp.read(),resp.status)
            
            
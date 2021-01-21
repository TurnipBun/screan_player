# -*- coding:utf-8 -*-
import re,shutil,json,os,urllib,sys,io
from bs4 import BeautifulSoup

def read_news():
    with open("./data/news.txt", encoding="utf-8") as news:
        for line in news:
            if line[0] == "#":
                continue
            else:
                return re.sub(" ","&nbsp;",line)
				
def read_bdi():
    try:
        content=urllib.request.urlopen("http://value500.com/BDI.asp")
        soup = BeautifulSoup(content,features="html5lib")
        unicode_result = str(soup.body.contents[1].contents[7].tbody.tr.contents[3].table.tbody.tr.td.contents[7].table.tbody)
    except:
        return ""
    else:
        return '<table class="table_bdi">'+unicode_result+'</table>'
		
news = read_news()
print(news)
bdi_table = read_bdi()
print(bdi_table)
with open("./template/broadcast.html",encoding="utf-8") as html, open("./template/temp.html", "w", encoding="utf-8") as temp:
    for line in html:
        if news != "":
            line = re.sub('<td class="news">.*</td>', '<td class="news">' + news + '</td>', line)
        if bdi_table != "":
            line = re.sub('<table class="table_bdi">.*</table>', bdi_table, line)
        temp.write(line)
		
shutil.move("./template/temp.html", "./template/broadcast.html")
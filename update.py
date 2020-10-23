import re,shutil,json
			
def read_news():
    with open("./data/news.txt", encoding="utf-8") as news:
        for line in news:
            if line[0] == "#":
                continue
            else:
                return re.sub(" ","&nbsp;",line)
				
def read_bdi():
    with open("./data/bdi_week.json", encoding="utf-8") as bdi:
        content = bdi.read()
        obj = json.loads(content)
        html_table = '<table class="table_bdi"><tr><th>日期</th><th>'+obj[0]["date"]+'</th><th>'+obj[1]["date"]+'</th><th>'+obj[2]["date"]+'</th><th>'+obj[3]["date"]+'</th><th>'+obj[4]["date"]+'</th></tr><tr><th>指数</th><td>'+obj[0]["index"]+'</td><td>'+obj[1]["index"]+'</td><td>'+obj[2]["index"]+'</td><td>'+obj[3]["index"]+'</td><td>'+obj[4]["index"]+'</td></tr><tr><th>涨跌</th><td>'+obj[0]["change_count"]+'</td><td>'+obj[1]["change_count"]+'</td><td>'+obj[2]["change_count"]+'</td><td>'+obj[3]["change_count"]+'</td><td>'+obj[4]["change_count"]+'</td></tr></table>'
        return html_table
		
news = read_news()
bdi_table = read_bdi()
with open("./template/broadcast.html",encoding="utf-8") as html, open("./template/temp.html", "w", encoding="utf-8") as temp:
    for line in html:
        line = re.sub('<td class="news">.*</td>', '<td class="news">' + news + '</td>', line)
        line = re.sub('<table class="table_bdi">.*</table>', bdi_table, line)
        temp.write(line)
		
shutil.move("./template/temp.html", "./template/broadcast.html")
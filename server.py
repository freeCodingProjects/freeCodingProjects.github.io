import http.server
import socketserver
import threading
import time
import os
from http.server import SimpleHTTPRequestHandler, HTTPServer
PORT = 9090

#Handler = http.server.SimpleHTTPRequestHandler

'''
with socketserver.TCPServer(("", PORT), Handler, bind_and_activate=False) as httpd:
	os.chdir(os.getcwd())
	print("serving port:", PORT)
	print("localhost:{0}".format(PORT))
	try:
		httpd.server_bind()
		print(httpd)
		httpd.server_activate()
		httpd.serve_forever()
	except KeyboardInterrupt:
		httpd.server_close()
		httpd.shutdown()
		print("server shutdown")
	except:
		httpd.server_close()
		httpd.shutdown()
		raise Exception("FUCK ME CLOSE THE SERVER")
'''
from livereload import Server, shell
server = Server()
print(os.getcwd())
server.watch(os.getcwd())
server.serve()
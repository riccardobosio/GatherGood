giimport multiprocessing

bind = '0.0.0.0:8000'
preload_app = True
max_requests = 100
max_requests_jitter = 20
workers = multiprocessing.cpu_count() * 2 + 1
timeout = 40

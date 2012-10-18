import os, sys
import django.core.handlers.wsgi


sys.path.append('/home/pubuntu')
sys.path.append('/home/pubuntu/fb')

os.environ['DJANGO_SETTINGS_MODULE'] = 'fb.settings'
application = django.core.handlers.wsgi.WSGIHandler()


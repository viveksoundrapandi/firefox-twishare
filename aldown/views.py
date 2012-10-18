# Create your views here.
from django.http import HttpResponseRedirect,HttpResponse
from django.shortcuts import render_to_response
import zip
import urllib
import logging
import os
from shutil import rmtree as remove_dir
from django.utils import simplejson
log = logging.getLogger(__name__)

def home(request):
    if request.method=="POST":
	log.info(request.POST)
	file_name = "/tmp/albums/"+request.POST['name']
	if os.path.exists(file_name):
	   remove_dir(file_name)
	os.makedirs(file_name)
	for i in request.POST.getlist('li1[]'):
	    urllib.urlretrieve(i, file_name+'/'+i.split('/')[-1])
	return HttpResponse(simplejson.dumps({'redirect_url':'/aldown/download/'+request.POST['name']+".zip"}),mimetype="application/json")
    return render_to_response("aldown.html",{})
def download(request,file_name=""):
    log.info(file_name)
    if file_name:
	file_name=file_name.encode('ascii', 'ignore')
	file_path = "/tmp/albums/"+file_name[:-4]
#        zip.zipdir(dirPath = file_path, zipFilePath=file_path+".zip",includeDirInZip = False)
#        response = HttpResponse(open(file_path+".zip"), content_type='application/zip')
#	response['Content-Disposition'] = 'attachment; filename='+file_name+'.zip'
#        response['Content-Type'] = 'application/x-zip'
    	response = HttpResponse(mimetype='application/x-gzip')
	import tarfile
	response['Content-Disposition'] = 'attachment; filename=download.tar.gz'
	tarred = tarfile.open(fileobj=response, mode='w:gz')
	tarred.add("/tmp/albums/", arcname=file_name[:-4])
	tarred.close()
        return response
	

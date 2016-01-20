

from django.conf.urls import patterns, include, url
from django.contrib import admin
from restapp import views

admin.autodiscover()
urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^(?P<batch>[0-9]+)$', views.batch, name='batch'),
	url(r'^admin/', include(admin.site.urls)),
	url(r'^queries/$', views.QueryList.as_view()),
	url(r'^keywords/(?P<qId>[0-9a-zA-Z\-\_]+)/$', views.KeywordList.as_view()),
	url(r'^keywords/(?P<qId>[0-9a-zA-Z\-\_]+)/(?P<person>[0-9a-zA-Z\-\_ ]+)/(?P<order>[0-9]+)/$', views.KeywordDetail.as_view()),
	url(r'^expected/(?P<qId>[0-9a-zA-Z\-\_]+)/$', views.ExpectedResultsDetail.as_view()),
)

# url(r'^$', views.index, name='index'),
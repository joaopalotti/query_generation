from restapp.models import *

from rest_framework import serializers

class QuerySerializer(serializers.ModelSerializer):


	keywords = serializers.SerializerMethodField('get_keywords_for_this')

	def get_keywords_for_this(self, obj):

		keywords = Keywords.objects.filter(query_id=obj)
		for keyword in keywords:
			serializer = KeywordSerializer(keyword)
			yield serializer.data

	class Meta:
		model = Query
		fields = ('qId', 'description', 'link', 'keywords')

class KeywordSerializer(serializers.ModelSerializer):
	class Meta:
		model = Keywords
		fields = ('person', 'keywords', 'order')

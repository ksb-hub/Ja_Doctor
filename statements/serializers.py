from rest_framework import serializers

from statements.models import Post, Statement


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['content', 'edited_at', 'duration', 'version_info', 'post_order']
        # extra_kwargs = {
        #     'version_info': {'read_only': True},
        # }


class StatementSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)

    class Meta:
        model = Statement
        fields = ['title', 'statement_order', 'posts']

    def create(self, validated_data):
        posts_data = validated_data.pop('posts')
        user = self.context['request'].user
        statement = Statement.objects.create(**validated_data, user=user)
        for post_data in posts_data:
            Post.objects.create(statement=statement, **post_data)
        return statement


class StatementRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statement
        fields = ['title']


class GetContentSerializer(serializers.Serializer):
    content = serializers.CharField(max_length=15000)
    order = serializers.CharField(max_length=1500)
from rest_framework import serializers

from statements.models import Post, Statement


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'content', 'edited_at', 'duration', 'version_info']
        # extra_kwargs = {
        #     'version_info': {'read_only': True},
        # }


class StatementSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)

    class Meta:
        model = Statement
        fields = ['title', 'posts']

    def create(self, validated_data):
        posts_data = validated_data.pop('posts')
        statement = Statement.objects.create(**validated_data)
        for post_data in posts_data:
            Post.objects.create(statement=statement, **post_data)
        return statement


class StatementRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statement
        fields = ['title']

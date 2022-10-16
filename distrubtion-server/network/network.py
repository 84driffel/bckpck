import deso

class NetworkHandler:
    def __init__(self):
        self.PUBLIC_KEY = 'BC1YLgGZWXVCnv6Y2Hir646YBuHC8N8UqvBG4xTC4kvYBCy4vaYfhVg'
        self.SEED_HEX = '36f0b0132bae6afa6582641d253d326fa30d198fa2bef5e9b4ddc2b9e3e811fc'
        self.desoPosts = deso.Posts()
        self.desoSocial = deso.Social(self.PUBLIC_KEY, self.SEED_HEX)
        self.posts = []

    def get_posts(self):
        return self.posts

    def sync(self):
        print('Attempting sync with network')
        self.posts = []
        for i in self.desoPosts.getPostsForPublicKey(username="BckPck").json()['Posts']:
            self.posts.append(i['Body'])

    def post(self, content):
        response = self.desoSocial.submitPost(content)
        return response.json()

    def postN(self, contents):
        responses = []
        for content in contents:
            responses.append(self.desoSocial.submitPost(content).json())
        return responses

def main():
    print('----Network Handler main----')
    net_hand = NetworkHandler()
    net_hand.sync()
    print(net_hand.posts)
    #net_hand.port(self
    

if __name__ == '__main__':
    main()
    

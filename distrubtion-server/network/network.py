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
            relimited = tuple(i['Body'].split('<|>')[1:-1])
            #print(relimited)
            if len(relimited) == 5:
                self.posts.append(relimited)

    def post(self, content):
        lim = "<|>"
        lim += content[0] + "<|>"
        lim += content[1] + "<|>"
        lim += str(content[2]) + "<|>"
        lim += content[3] + "<|>"
        lim += content[4] + "<|>"

        print(content)
        #for i in content:
        #    lim += i + "<|>"
        print(lim)
        response = self.desoSocial.submitPost(lim)
        return response.json()

    def postN(self, contents):
        responses = []
        for content in contents:
            responses.append(self.post(content))
        return responses

def main():
    print('----Network Handler main----')
    net_hand = NetworkHandler()
    net_hand.sync()
    print(net_hand.posts)
    #net_hand.post(('rbGlq8lSfmg','Daniel','1665874697','Matt is the coolest guy.','861e90f5ac860ebc6d384d7bdcd5f9e777c22e2cc13db7198f09ceab24ca0d9c'))
    #net_hand.post(('rbGlq8lSfmg','MattK','1665874740','Daniel is a meh guy.','c76c0e6f11b00ceb2d678305e6dca85f276f826b5489609a99200a9267ba063c'))
    #net_hand.post(('rbGlq8lSfmg','Connor','1665874787','Daniel is n eh guy.','5a8aafc31247279597ab2f8c167f77487cbcd4379e729cfdae57813974379be8'))
    

if __name__ == '__main__':
    main()
    

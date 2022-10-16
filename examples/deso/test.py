SEED_HEX = '36f0b0132bae6afa6582641d253d326fa30d198fa2bef5e9b4ddc2b9e3e811fc'
import deso



desoMetadata = deso.Metadata()
response = desoMetadata.getExchangeRate() # returns a response object.

desoUser = deso.User()

PUBLIC_KEY = 'BC1YLgGZWXVCnv6Y2Hir646YBuHC8N8UqvBG4xTC4kvYBCy4vaYfhVg'



#print(desoUser.getDerivedKeys(PUBLIC_KEY).json())

desoPosts = deso.Posts()

for i in desoPosts.getPostsForPublicKey(username="BckPck").json()['Posts']:
    print(i['Body'])





#SEED_HEX = '7375727072697365206172746566616374206772616e7420656e6C69737420696365206772616e742068656c6d657420616e6e6F756e6365206d6f6d20736369656e636520627573792063656e74757279'
#SEED_HEX = '8a7cd7a'


desoSocial = deso.Social(PUBLIC_KEY, SEED_HEX)


#print(desoSocial.submitPost("This is a test post").json()) #returns a response object. add .json() in end to see complete response



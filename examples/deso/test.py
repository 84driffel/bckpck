import deso

desoMetadata = deso.Metadata()
response = desoMetadata.getExchangeRate() # returns a response object.

desoUser = deso.User()

PUBLIC_KEY = 'BC1YLgGZWXVCnv6Y2Hir646YBuHC8N8UqvBG4xTC4kvYBCy4vaYfhVg'


print(desoUser.getDerivedKeys(PUBLIC_KEY).json())

desoPosts = deso.Posts()

postHashHex = "a2917f336b0635635a1640ca0d531cebf4d63744438e88f36384ce9ec3974a17"
print(desoPosts.getPostsForPublicKey(username="BckPck").json())


#SEED_HEX = '7375727072697365206172746566616374206772616e7420656e6C69737420696365206772616e742068656c6d657420616e6e6F756e6365206d6f6d20736369656e636520627573792063656e74757279'
SEED_HEX = '8a7cd7a'


desoSocial = deso.Social(PUBLIC_KEY, SEED_HEX)


print(desoSocial.submitPost("This is a test post").json()) #returns a response object. add .json() in end to see complete response


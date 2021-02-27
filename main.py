import random
import functions

PolicyList = ["Red", "Red", "Red", "Blue", "Blue"]
DiscardPile = []
voteNr = 0

run = True
while run:
    DrawList = functions.DrawPolicy(PolicyList)

    if functions.RedPerksLogic() == True:        
        voteNr = functions.chancellorVoteSupreme(voteNr, DiscardPile)
        if voteNr == True:
            print("Red team wins!")
            run = False
        elif type(voteNr) == type(5):
            functions.PresidentsTurn(DrawList, DiscardPile)
            functions.ChancellorsTurn(DrawList, DiscardPile)
            functions.AwardPoint(DrawList[0])
            run = functions.CheckForWinner()

    else:
        voteNr = functions.chancellorVote(voteNr, DiscardPile)
        functions.PresidentsTurn(DrawList, DiscardPile)
        functions.ChancellorsTurn(DrawList, DiscardPile)
        functions.AwardPoint(DrawList[0])
        run = functions.CheckForWinner()
    


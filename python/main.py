import functions

PolicyList = ["Red", "Red", "Red", "Blue", "Blue"]
DiscardPile = []
voteNr = 0

functions.AssignTeamMembers()
run = True
while run:
    DrawList = functions.drawPolicy(PolicyList)

    if functions.redPerksLogic() == True:        
        voteNr = functions.chancellorVoteSupreme(voteNr, DiscardPile)
        if voteNr == True:
            print("Red team wins!")
            run = False
        elif type(voteNr) == type(5):
            functions.presidentsTurn(DrawList, DiscardPile)
            functions.chancellorsTurn(DrawList, DiscardPile)
            functions.awardPoint(DrawList[0])
            run = functions.checkForWinner()

    else:
        voteNr = functions.chancellorVote(voteNr, DiscardPile)
        functions.presidentsTurn(DrawList, DiscardPile)
        functions.chancellorsTurn(DrawList, DiscardPile)
        functions.awardPoint(DrawList[0])
        run = functions.checkForWinner()
    


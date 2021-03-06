import random

RedPoints = 0
BluePoints = 0
clear = "\n"*100

def drawPolicy(PolicyList):
    DrawList = []

    i = 0
    while i < 3:
        DrawList.append(PolicyList[random.randint(0,4)])
        i += 1
    return DrawList

def discardCard(DrawList, discard, DiscardPile):
    discardedCard = DrawList[discard - 1]
    DiscardPile.append(discardedCard)
    return DiscardPile

def redPerksPrint():
    if RedPoints == 2:
        print("The president may check any players team affiliation.")
    elif RedPoints == 3:
        print("The president can kill any player. All players have to be quiet.")
    elif RedPoints == 4: 
        print("The president can kill any player. All players have to be quiet.")
        print("Also, if Supreme gets elected chancellor, Red team wins.")

def redPerksLogic():
    if RedPoints == 2:
        SupremeWin = False
    elif RedPoints == 3:
        SupremeWin = False
    elif RedPoints == 4: 
        SupremeWin = True
    else:
        SupremeWin = False
    return SupremeWin

def awardPoint(enactedPolicy):
    if enactedPolicy == "Blue":
        global BluePoints
        print("A blue policy was enacted.")
        BluePoints += 1

    elif enactedPolicy == "Red":
        global RedPoints
        print("A red policy was enacted.")
        RedPoints += 1

def chancellorVote(voteNr, DiscardPile):
    print("\nTime to vote for chancellor!")

    voteState = False
    while not voteState:
        vote = input("Did the chancellor pass the vote? (y/n)")

        if vote == "y":
            print("The chancellor vote was passed!")
            voteState = True
        elif vote == "n":
            print("The chancellor vote was not passed!")
            voteNr += 1
        else: 
            print("Answer with 'y' (yes) or 'n' (no), please!")

        if voteNr == 3:
            print("\nThe chancellor vote has not been passed in three tries. The upper policy in the discard pile will be enacted!")
            awardPoint(DiscardPile[-1])
            voteNr = 0
            voteState = True
    return voteNr

def checkForWinner():
    if RedPoints == 5:
        print("Red team wins!")
        run = False
    elif BluePoints == 5:
        print("Blue team wins!")
        run = False
    else: 
        print("\nRed:" + str(RedPoints))
        print("Blue:" + str(BluePoints))
        run = True
    return run

def chancellorVoteSupreme(voteNr, DiscardPile):
    print("\nTime to vote for chancellor!")

    voteState = False
    while not voteState:
        vote = input("Did the chancellor pass the vote? (y/n)")

        if vote == "y":
            print("The chancellor vote was passed!")
            SupremeQuery = input("Were you the Supreme? (y/n): ")
            if SupremeQuery == "y":
                voteState = True
                return True
            elif SupremeQuery == "n":
                voteState = True
        elif vote == "n":
            print("The chancellor vote was not passed!")
            voteNr += 1
        else: 
            print("Answer with 'y' (yes) or 'n' (no), please!")

        if voteNr == 3:
            print("\nThe chancellor vote has not been passed in three tries. The upper policy in the discard pile will be enacted!")
            awardPoint(DiscardPile[-1])
            voteNr = 0
            voteState = True
    return voteNr

def presidentsTurn(DrawList, DiscardPile):
    print("\n================= PRESIDENTS TURN =================")
    print("You have drawn the following policies: ")
    print(DrawList)
    discard = int(input("\nPresident, which policy do you want to discard? (1,2,3): \n"))

    discardCard(DrawList, discard, DiscardPile)
    DrawList.pop(discard - 1)
    return DrawList, DiscardPile

def chancellorsTurn(DrawList, DiscardPile):
    print("\n================= CHANCELLORS TURN =================")
    print("You have recieved the following policies: ")
    print(DrawList)
    discard = int(input("\nChancellor, which policy do you want to discard? (1,2): "))

    discardCard(DrawList, discard, DiscardPile)
    DrawList.pop(discard - 1)
    return DrawList, DiscardPile

def AssignTeamMembers():
    numberOfPlayers = int(input("How many players: "))
    teamList = ["Blue", "Red - Supreme", "Blue", "Red", "Blue", "Red", "Blue", "Red", "Blue", "Red", "Blue", "Red"]
    
    for i in range(12 - numberOfPlayers):
        teamList.pop(-1)

    random.shuffle(teamList)

    for i in range(numberOfPlayers):
        input("Press 'Enter' to show your team affiliation.")
        input("You were assigned team " + teamList[i] + "\n Press enter to hide your team affiliation.")
        print(clear)
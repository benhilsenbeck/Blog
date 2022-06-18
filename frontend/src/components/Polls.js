import React, {useEffect, useState} from 'react'
import '../static/css/polls.scss'
import axios from 'axios'
import readCookie from './ReadCookie'
import {useSelector} from 'react-redux';
const config = require('./constants').config()

const Polls = () => {
    const categorySet = useSelector(state => state.setPollCategory)
    const [polls, setPolls] = useState(null)
    
    const getPolls = async() => {
        console.log(categorySet)
        console.log(window.location.href)
        await axios.get(config.API_URL + "blog/poll/category", {
            params: {
                Category: categorySet
            }
        })
        .then(res => {
            setPolls(res.data)
            console.log(res.data)
        })
    }

    const checkVotedPolls = async() => {
        let votedPolls = readCookie('votedPolls')
        console.log(votedPolls)
        if (votedPolls === null) {
            // do nothing cause there were not polls that were voted on yet
        } else {
            await axios.get(config.API_URL + "blog/pollPercentages", {
                params: {
                    pollIds: votedPolls
                }
            }) 
            .then (res => {
                console.log(res.data)
                if (res.data === "NoVotes") {
                    // do nothing cause nothing needs to happen if there were no votes
                } else {
                    for(let i in res.data) {
                        console.log(i)
                        try {
                            getContainers(i, res.data[i][0], res.data[i][1])
                        }
                        catch {
                            //do nothing because you dont want the function to run is all
                        }
                    }
                }
            });
        }
    }

    const handleVote = async(e, buttonName, buttonPosition) => {
        await axios.post(config.API_URL + "blog/polls", {
            button: buttonName,
            buttonPosition: buttonPosition,
        })
        .then(res => {
            console.log(res.data)
            let target = e.target.className
            let array1 = target.split(" ");
            let pollNumber = array1[2]
            let image1Percentage = res.data[0]
            let image2Percentage = res.data[1]
            getContainers(pollNumber, image1Percentage, image2Percentage)
            let currentPolls = readCookie("votedPolls")
            if (currentPolls === null) {
                document.cookie = "votedPolls=" + pollNumber
            } else {
                document.cookie = "votedPolls=" + currentPolls + "," + pollNumber
            }
        })
    }

    const getContainers = (number, percentage1, percentage2) => {
        let target2 = document.getElementById("container" + number)
        let buttons = target2.getElementsByTagName('button')
        let votes = target2.getElementsByClassName('votes')
        votes[0].innerHTML = percentage1 + "%"
        votes[1].innerHTML = percentage2 + "%"
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "none";
            votes[i].style.display = "block";
        }
    }

    useEffect(() => {
        getPolls()
        checkVotedPolls()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="wrapper">
            {polls && polls.map((polls, index) => {
                return (
                    <div className="pollsContainer">
                        <div key={index} className={"container " + polls.id} id={"container" + polls.id}>
                            <div className="row" id="row">
                                <div className="col-12 title">
                                    <p>{polls.Title}</p>
                                </div>
                                <div className="section1" id="section1">
                                    <img className="col-12" src={config.API_URL +  "media/" + polls.Image1} alt={polls.Button1} />
                                    <button className={"btn btn-primary " + polls.id} id="voteButton" defaultChecked={false} onClick={(e) => handleVote(e, polls.Button1, 1)}>{polls.Button1}</button>
                                    <p className="votes" id="votes"></p>
                                </div>
                                <div className="section2">
                                    <img className="col-12" src={config.API_URL +  "media/" + polls.Image2} alt={polls.Button2} />
                                    <button className={"btn btn-primary " + polls.id} id="voteButton" defaultChecked={false} onClick={(e) => handleVote(e, polls.Button2, 2)}>{polls.Button2}</button>
                                    <p className="votes" id="votes"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <br/>
            <br/>
        </div>
    )
}


export default Polls
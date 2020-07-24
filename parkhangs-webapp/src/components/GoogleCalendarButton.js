
require('dotenv').config()
import React from 'react'
import {connect} from 'react-redux'



//signs in user and allow them to choose between calendars to add to
class GoogleCalendarButton extends React.Component{ 
   CLIENT_ID = process.env.CLIENT_ID;
   API_KEY = process.env.API_KEY;
   DISCOVERY_DOCS =process.env.DISCOVERY_DOCS;
   SCOPES = process.env.SCOPES;

   constructor(props){
       super(props);

       this.state = {
           gapiReady: false
       }
   } 
  
    //TODO: ensure event prop is passed in

    componentDidMount() {
        this.loadApi();
    }

    loadApi(){
         const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        document.body.appendChild(script);

        script.onload = () => {
            window.gapi.load('client:auth2', () => {
               
                console.log("loaded client")
        
                window.gapi.client.init({
                    apiKey: this.API_KEY,
                    clientId: this.CLIENT_ID,
                    discoveryDocs: this.DISCOVERY_DOCS,
                    scope: this.SCOPES,
                })    
    
                window.gapi.client.load('calendar', 'v3', () => {
                    console.log("calendar loaded")
                    this.setState({gapiReady: true});
                })
            })
        } 
    }

    addEvent = (event) => {
         window.gapi.auth2.getAuthInstance().signIn().then (() => {
            let newEvent = {
                //TODO: currently dummy event data
                    //change all of this to the event passed in; might need to use state
                'summary': 'Google I/O 2015',
                'location': '800 Howard St., San Francisco, CA 94103',
                'description': 'A chance to hear more about Google\'s developer products.',
                'start': {
                  'dateTime': '2015-05-28T09:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'end': {
                  'dateTime': '2015-05-28T17:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                  {'email': 'lpage@example.com'},
                  {'email': 'sbrin@example.com'}
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                  ]
                }
            }

            const request = window.gapi.client.calendar.events.insert({
                calendarId: "primary",
                resourse: newEvent
            })

            request.execute(event => {
                window.open(event.htmlLink)
            })
        })
        
    } 





   
    

    render () {
        const {gapiReady} = this.state
        return (
            <button className="google-calendar-button" onClick={() => {this.addEvent(this.props.event)}}> Add Event</button>  
        )
    }  
}

const mapStateToProps = (state) => {
    return {
        parks: state.parks.parks
    }
}

export default connect(mapStateToProps, null)(GoogleCalendarButton);
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default class App extends React.Component {
  render() {

    const calendarRef = React.createRef()

    return (
      <FullCalendar
        ref={calendarRef}
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={this.handleDateSelect}
        eventContent={renderEventContent}
        eventClick={this.handleEventClick}
        eventsSet={this.handleEvents}
        customButtons={{
          timeLineDayBtn: {
            text: "Day Timeline",
            click() {
              const calendar = calendarRef.current;

              if (calendar) {
                const calendarApi = calendar.getApi();

                calendarApi.changeView("timeGridDay");
              }
            }
          },
          timeLineWeekBtn: {
            text: "Week Timeline",
            click() {
              const calendar = calendarRef.current;

              if (calendar) {
                const calendarApi = calendar.getApi();

                calendarApi.changeView("timeGridWeek");
              }
            }
          }
        }}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "today,dayGridDay,dayGridWeek,dayGridMonth,timeLineDayBtn,timeLineWeekBtn"
        }}
      />
    )
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
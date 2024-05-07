import React, { useState } from 'react';
import { Box, Image, Text, Badge, Button, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import styles from './EventGrid.module.css';
import ReactDOM from 'react-dom';
// import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const EventGrid = ({ events }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.600', 'white');
    const shadow = useColorModeValue('lg', 'dark-lg');

    const [open, setOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    const onOpenModal = (event) => {
        setCurrentEvent(event);
        setOpen(true);
    };
    const onCloseModal = () => setOpen(false);
    const closeIcon = React.createElement('svg', { fill: "currentColor", viewBox: "0 0 30 30", width: 28, height: 28 },
        React.createElement('path', {
            fill: "#ccc9c4",
            fillRule: "evenodd",
            d: "M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z",
            clipRule: "evenodd"
        })
    );

    const getImageUrl = (imageName) => `/${imageName}`;

    return React.createElement(Grid, { className: styles.gridContainer },
        events.map((event, index) => 
            React.createElement(GridItem, { key: event.id, className: styles.eventCard },
                React.createElement(Image, { src: getImageUrl(event.imageUrl), alt: "Event", className: styles.eventImage }),
                React.createElement(Box, { className: styles.eventInfo },
                    React.createElement(Text, { className: styles.eventTitle }, event.name),
                    React.createElement(Text, { className: styles.eventDate }, `${event.date} • ${event.time}`),
                    React.createElement(Text, { className: styles.eventLocation }, `Location: ${event.location}`),
                    React.createElement(Text, { className: styles.eventOrganizer }, `Organizer: ${event.organizer}`),
                    React.createElement(Text, { className: styles.eventAttendees }, `${event.attendees} attendees`),
                    React.createElement(Button, { className: styles.learnMoreBtn, onClick: () => onOpenModal(event) }, "Learn More")
                ),
                event.isFull && React.createElement(Badge, { className: styles.eventBadge, position: "absolute", top: "2", right: "2", colorScheme: "red" }, "Almost Full")
            )
        ),
        currentEvent && React.createElement(Modal, {
            open: open, onClose: onCloseModal, center: true, closeIcon: closeIcon, classNames: {
                modal: styles.modalContainer,
                overlay: styles.modalOverlay,
                closeButton: styles.modalCloseButton
            }
        },
            React.createElement('div', { className: styles.modalContent },
                React.createElement('h1', { className: styles.modalTitle }, currentEvent.name),
                React.createElement(Image, { src: getImageUrl(currentEvent.imageUrl), alt: "Event", className: styles.modalImage }),
                React.createElement('h3', { className: styles.modalText }, `${currentEvent.date} • ${currentEvent.time}`),
                React.createElement('h4', { className: styles.eventLocation }, `Location: ${currentEvent.location}`),
                React.createElement('h4', { className: styles.eventOrganizer }, `Organizer: ${currentEvent.organizer}`),
                React.createElement('h4', { className: styles.eventAttendees }, `${currentEvent.attendees} attendees`),
                React.createElement('p', { className: styles.modalText }, currentEvent.details)
            )
        )
    );
};

export default EventGrid;

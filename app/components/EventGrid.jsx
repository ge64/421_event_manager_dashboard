import React, { useState } from 'react';
import { Box, Image, Text, Badge, Button, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import styles from './EventGrid.module.css';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const EventGrid = ({ events = [] }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.600', 'white');
    const shadow = useColorModeValue('lg', 'dark-lg');

    const [open, setOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null); // New state for the current event's details

    const onOpenModal = (event) => {
        setCurrentEvent(event); // Update the current event's details
        setOpen(true);
    };
    const onCloseModal = () => setOpen(false);
    const closeIcon = (
        <svg fill="currentColor" viewBox="0 0 30 30" width={28} height={28}>
            <path
                fill="#ccc9c4"
                fillRule="evenodd"
                d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"
                clipRule="evenodd"
            ></path>
        </svg>
    );

    const getImageUrl = (imageName) => {
        return `/${imageName}`;
    };

    return (
        <Grid className={styles.gridContainer}>
            {events.map((event, index) => (
                <GridItem key={event.id} className={styles.eventCard}>

                    <Image src={getImageUrl(event.imageUrl)} alt="Event" className={styles.eventImage} />

                    <Box className={styles.eventInfo}>
                        <Text className={styles.eventTitle}>{event.name}</Text>
                        <Text className={styles.eventDate}>{event.date} • {event.time}</Text>
                        <Text className={styles.eventLocation}>Location: {event.location}</Text>
                        <Text className={styles.eventOrganizer}>Organizer: {event.organizer}</Text>
                        <Text className={styles.eventAttendees}>{event.attendees} attendees</Text>

                        {/* Pass the current event to the onClick handler */}
                        <Button className={styles.learnMoreBtn} onClick={() => onOpenModal(event)}>
                            Learn More
                        </Button>
                    </Box>

                    {event.isFull && (
                        <Badge className={styles.eventBadge} position="absolute" top="2" right="2" colorScheme="red">
                            Almost Full
                        </Badge>
                    )}
                </GridItem>
            ))}
            {currentEvent && (
                <Modal open={open} onClose={onCloseModal} center closeIcon={closeIcon} classNames={{
                    modal: styles.modalContainer,
                    overlay: styles.modalOverlay,
                    closeButton: styles.modalCloseButton
                }}>
                    <div className={styles.modalContent}>
                        {/* Use the current event's details for the modal content */}
                        <h1 className={styles.modalTitle}>{currentEvent.name}</h1>
                        <Image src={getImageUrl(currentEvent.imageUrl)} alt="Event" className={styles.modalImage} />
                        <h3 className={styles.modalText}>{currentEvent.date} • {currentEvent.time}</h3>
                        <h4 className={styles.eventLocation}>Location: {currentEvent.location}</h4>
                        <h4 className={styles.eventOrganizer}>Organizer: {currentEvent.organizer}</h4>
                        <h4 className={styles.eventAttendees}>{currentEvent.attendees} attendees</h4>
                        <p className={styles.modalText}>{currentEvent.details}</p>
                    </div>
                </Modal>
            )}
        </Grid>
    );
};
export default EventGrid;

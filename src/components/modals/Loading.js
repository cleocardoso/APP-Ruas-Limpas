import React from 'react'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import { View, Modal } from 'react-native'
import { Footer, Container, Content, Body } from 'native-base'

const Loading = ({ lottie, lottie2 }) => {

    return (
        <Modal visible={lottie2 !== undefined || lottie !== undefined}>
            <Container style={{ backgroundColor: '#f5f5f5' }}>
                <Content />
                <LottieView
                    source={lottie}
                    autoPlay loop
                />
                <LottieView
                    source={lottie2}
                    autoPlay loop
                />
            </Container>
        </Modal>
    );
}

export default Loading


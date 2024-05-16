import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image, TextInput, Text, StatusBar, FlatList, StyleSheet, ImageBackground, ScrollView, Platform, Linking } from 'react-native';
import { IMAGES } from "../../Constants/images";
import { COLORS } from "../../Constants/colors";
import { scaleHeight, scaleWidth, normalizeFont } from '../../Constants/dynamicSize';
import { FONTS } from '../../Constants/fonts';
import { Divider } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { Animations } from '../../Constants/animations';
import FastImage from 'react-native-fast-image';
import ChatLineChart from '../Charts/ChatLineChart';
import ChartBar from '../Charts/ChartBar';
import CustomHeader from '../../Components/CustomHeader';
import Voice from '@react-native-voice/voice';
import moment from 'moment';
import { findBestMatch } from 'string-similarity';
import Tts from 'react-native-tts';
import SankeyChart from '../../Components/SankeyChart';
import axios from 'axios';

const ChatScreen = ({ navigation, route }) => {
    const data = [
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs'],
            y: [200, 360, 380, 410, 380],
            type: 'lines',
            mode: 'lines',
            name: 'Scope 1',
            marker: {
                color: COLORS.BLUE,
            },
        },
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs'],
            y: [990, 830, 810, 900, 820],
            type: 'lines',
            mode: 'lines',
            name: 'Predicted',
            marker: {
                color: COLORS.PINK,
            },
        },
    ];


    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [chatArray, setChatArray] = useState([]);
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => { setIsRecording(false) };
    Voice.onSpeechError = err => setError(err);
    Voice.onSpeechResults = result => {
        handleSave(result)
    };

    const handleSave = (result) => {
        setResult(result.value[0]);
        handleVoiceSend(result.value[0])
    }
    const startRecording = async () => {
        setIsRecording(true)
        try {
            await Voice.start('en-Us');
        } catch (err) {
            setError(err)
        }
    }

    const [weatherData, setWeatherData] = useState(null);
    const stopRecording = async () => {
        setIsRecording(false)
        try {
            await Voice.stop()
        } catch (err) {
            setError(err)
        }

    }

    const getImageSource = () => {
        let imageSource;

        switch (chatArray.length) {
            case 0:
                imageSource = IMAGES.animation1;
                break;
            case 1:
                imageSource = IMAGES.animation7;
                break;
            case 2:
                imageSource = IMAGES.animation3;
                break;
            case 3:
                imageSource = IMAGES.animation5;
                break;
            case 4:
                imageSource = IMAGES.animation2;
                break;
            default:
                imageSource = IMAGES.animation6;
                break;
        }
        return imageSource;
    };

    useEffect(() => {
        setChatArray([{ type: 'receiver', message: 'How may I help you today?' }]);
    }, [navigation]);

    const [id, setId] = useState();
    const manualQnA = [
        { question: 'NCV focuses on ?', answer: "Net Carbon vision focus on Global Climate &Decarbonization requirements towards meeting Net Zero 2030/ 2050. We offer Consultancy, Implementation, Digital Services Carbon Management Life Cycle - Carbon Monitoring & Analysis , Carbon Trading Services as well on Digital Services on Low Carbon Fuel - Hydrogen Supply Chain Management." },
        { question: 'I need some help?', answer: 'Sure, I can assist you with that.' },
        { question: 'What is the weather in chennai ?', answer: 'The Weather details are listed below:-' },
        { question: 'What can I assist you with?', answer: " I'm here to help you. Feel free to ask anything." },
        { question: 'Do you have any questions for me?', answer: "No, I don't have any questions at the moment." },
        { question: 'How can I be of service?', answer: 'You can let me know what you need assistance with.' },
        { question: 'Is there anything specific you need?', answer: 'Yes, I need help with XYZ.' },
        { question: 'Send me the Scope1 data? ', answer: 'Here is the Line Chart Scope 1 Actual and Predicted data' },
        { question: 'what is the emission in Scope2?', answer: 'Here is the Emission of Scope2' },
        { question: 'give some brief about netcarbon vision ?', answer: 'Net Carbon Vision Private Limited (NCVPL) is a Private Limited Indian Non-Government Company incorporated in India on 02 June 2023 ( nine months17 days old). Its registered office is in Chennai, Tamil Nadu' },
        { question: 'NCV specialized at ?', answer: "Our company NCV specializes in Plant Asset Maintenance, Inventory Management, Material Optimization, Emissions Monitoring, and Carbon Trading. With a deep understanding of these industries, we provide expert Consultancy Services and Develop Digital Solutions to help organizations Reduce Carbon Emissions, Trade Carbon Credits, and Manage the Generation, Supply, and Distribution of Hydrogen." }
    ];

    const weather = [
        { id: 1, day: 'Tue', image: IMAGES.smallRain },
        { id: 2, day: 'Wed', image: IMAGES.smallSnow },
        { id: 3, day: 'Thu', image: IMAGES.cloud },
        { id: 4, day: 'Fri', image: IMAGES.sun },
        { id: 5, day: 'Sat', image: IMAGES.cloudsun },
    ]

    const timeline = [
        { id: 1, timeline: '24hour' },
        { id: 2, timeline: '1day' },
        { id: 3, timeline: '1week' },
        { id: 4, timeline: '1month' },
        { id: 5, timeline: '1year' },
    ]

    const renderItem = ({ item, index }) => (
        <Chats item={item} index={index} animation={'flipInY'} />
    );

    const sankey = [
        ["Emission", "Scope1", 6],
        ["Emission", "Scope2", 6],
        ["Emission", "Scope3", 6],
        ["Scope1", "Plant1", 2],
        ["Scope1", "Plant2", 2],
        ["Scope1", "Plant3", 2],
        ["Scope2", "WHRB", 1.5],
        ["Scope2", "GRID", 1.5],
        ["Scope2", "Captive", 1.5],
        ["Scope2", "Solar", 1.5],
        ["WHRB", "Process4", 1.5],
        ["GRID", "Process5", 1.5],
        ["Captive", "Process6", 1.5],
        ["Solar", "Process7", 1.5],
        ["Scope3", "Categories1", 1.2],
        ["Scope3", "Categories7", 1.2],
        ["Scope3", "Categories9", 1.2],
        ["Scope3", "Categories14", 1.2],
        ["Scope3", "Categories15", 1.2],
        ["Plant1", "Process1", 2],
        ["Plant2", "Process2", 2],
        ["Plant3", "Process3", 2],
        ["Categories1", "Process8", 1.2],
        ["Categories7", "Process9", 1.2],
        ["Categories9", "Process10", 1.2],
        ["Categories14", "Process11", 1.2],
        ["Categories15", "Process12", 1.2],
    ];

    const [location, setlocation] = useState('')
    const todayDate = moment().format('DD MMM-YYYY');
    const fadeIn = {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    };
    const Bardata = [
        {
            x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            y: [50, 10, 30, 40, 20, 10, 5],
            type: 'bar',
            mode: 'bar',
            name: 'bar',
        },
    ];
    const spokenMessages = useRef([]);
    const Chats = React.memo(({ item, index, animation }) => {


        useEffect(() => {
            if (item.type === 'receiver' && !spokenMessages.current.includes(item.message)) {
                Tts.setDefaultVoice('com.apple.ttsbundle.Yuna-compact');
                Tts.speak(item.message);
                // item.message !== 'I\'m sorry, I couldn\'t understand. Can you please rephrase?' && 
                spokenMessages.current.push(item.message);
            }
        }, [item.message]);

        return (
            <Animatable.View>
                <View style={{ marginHorizontal: scaleWidth(20), marginVertical: scaleHeight(10) }}>
                    {item.type === 'receiver' &&
                        <>
                            <View style={styles.row}>
                                <View>
                                    <Image source={IMAGES.bot} style={styles.genie} resizeMode='contain'/>
                                </View>
                                <View style={{ maxWidth: '85%', minWidth: '40%' }}>
                                    <View style={styles.bubblewrapperLeftStyle}>
                                        <Animatable.Text style={styles.bubbleLeftTextStyle}>{item.message}</Animatable.Text>
                                        {item.message === 'The Weather details are listed below:-' && 
                                        <View style={{marginBottom: 20}}>
                                        <Animatable.Text style={styles.bubbleLeftTextStyle1}>
                                        WindDirection : {weatherData?.current?.wind_dir}
                                        </Animatable.Text>
                                         <Animatable.Text style={styles.bubbleLeftTextStyle1}>
                                        Wind Speed : {weatherData?.current?.wind_kph}Kph
                                        </Animatable.Text>
                                        <Animatable.Text style={styles.bubbleLeftTextStyle1}>
                                        Humidity: : {weatherData?.current?.humidity}
                                        </Animatable.Text>
                                        <Animatable.Text style={styles.bubbleLeftTextStyle1}>
                                        Pressure: : {weatherData?.current?.pressure_in}
                                        </Animatable.Text>
                                        <Animatable.Text style={styles.bubbleLeftTextStyle1}>
                                        Precipitation: : {weatherData?.current?.precip_mm} inch
                                        </Animatable.Text>
                                        <Animatable.Text style={styles.bubbleLeftTextStyle1}>
                                        wind gust: {weatherData?.current?.gust_kph} Kph
                                        </Animatable.Text>
                                        <Animatable.Text style={styles.bubbleLeftTextStyle1}>
                                        cloudy: {weatherData?.current?.cloud} %
                                        </Animatable.Text>
                                       
                                        
                                  </View>}
                                    </View>
                                    <Text style={styles.timestyle}>10.45 pm</Text>
                                </View>
                            </View>
                            {item.message === 'Here is the Line Chart Scope 1 Actual and Predicted data' &&
                                <View style={styles.line}>
                                    <ChatLineChart data={data} />
                                </View>
                            }
                            {item.message === "Here is the Emission of Scope2" &&
                                <View style={styles.bar}>
                                    <View style={styles.imgbg1}>
                                        <View style={styles.heatmapbox}>
                                            <Text style={styles.boxtitle}>{"Scope 1 Emission"}</Text>
                                            <View style={styles.row1}>
                                                <Text style={styles.co2text}>{'2675'}</Text>
                                                <Image source={IMAGES.Emission1} style={styles.icon} resizeMode='contain' />
                                            </View>
                                        </View>
                                        <Text style={styles.boxtitle1}>{"Shree Cement"}</Text>
                                        <Text style={styles.boxtitle1}>{"Baloda Bazaar (Raipur)"}</Text>
                                        <ChartBar data={Bardata} />
                                        <FlatList
                                            contentContainerStyle={{ marginBottom: 10 }}
                                            style={{ alignSelf: 'center' }}
                                            horizontal
                                            data={timeline}
                                            renderItem={(item) => {
                                                return (
                                                    <TouchableOpacity onPress={() => setId(item.item.id)}>
                                                        <View style={[styles.box2, { backgroundColor: id === item.item.id ? COLORS.BGCOLOR : COLORS.GREYBG }]}>
                                                            <Text style={[styles.boxtitle2, , { color: id === item.item.id ? COLORS.WHITE : COLORS.BLACK }]}>{item.item.timeline}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }} />
                                    </View>
                                </View>
                            }
                            {/* {item.message === "Today's minimum temperature in Chennai is recorded at 36°c (degrees celsius), and the maximum temperature is expected to go as high as 32°c (degrees celsius)." &&
                                <ImageBackground source={imageSources[currentImageIndex].image} style={styles.imgbg}>
                                    <View style={styles.degreeview}>
                                        <View>
                                            <View style={styles.degree}>
                                                <Image source={imageSources[currentImageIndex].smallimge} style={styles.snow} resizeMode='contain' />
                                                <Text style={styles.snowtext}>{imageSources[currentImageIndex].title}</Text>
                                            </View>
                                            <Text style={styles.degreetext}>{imageSources[currentImageIndex].degree}</Text>
                                        </View>
                                        <View style={{ marginRight: scaleWidth(20) }}>
                                            <Text style={styles.timetext}>{imageSources[currentImageIndex].time}</Text>
                                            <Text style={styles.daytext}>Mon, July 17</Text>
                                        </View>
                                    </View>
                                    <View style={styles.location}>
                                        <Image source={IMAGES.location} style={styles.snow} resizeMode='contain' />
                                        <Text style={styles.daytext}>{imageSources[currentImageIndex].location}</Text>
                                    </View>
                                    <View style={[styles.weatherwidget, { backgroundColor: imageSources[currentImageIndex].color }]}>
                                        <FlatList
                                            data={weather}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={(item) => {
                                                return (
                                                    <View style={styles.location1}>
                                                        <Text style={styles.daydaytext}>{item.item.day}</Text>
                                                        <Image source={item.item.image} style={[styles.snow, { marginLeft: scaleWidth(3) }]} resizeMode='contain' />
                                                        {item.item.id !== weather?.length && <Divider style={styles.divider} />}
                                                    </View>
                                                )
                                            }} />
                                    </View>
                                </ImageBackground>
                            } */}
                             {item.message === 'The Weather details are listed below:-' &&
                                <ImageBackground source={weatherData?.current?.condition?.text === "Partly cloudy" ? IMAGES.Breeze : IMAGES.Sunny} style={styles.imgbg}>
                                    <View style={styles.degreeview}>
                                        <View>
                                            <View style={styles.degree}>
                                                <Image source={imageSources[currentImageIndex].smallimge} style={styles.snow} resizeMode='contain' />
                                                <Text style={styles.snowtext}>{weatherData?.current?.condition?.text}</Text>
                                            </View>
                                            <Text style={styles.degreetext}>{weatherData?.current?.temp_c}°c</Text>
                                        </View>
                                        <View style={{ marginRight: scaleWidth(20) }}>
                                            <Text style={styles.timetext}>{moment().format('HH:mm')}</Text>
                                            <Text style={styles.daytext}>{moment().format('ddd, MMMM DD')}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.location}>
                                        <Image source={IMAGES.location} style={styles.snow} resizeMode='contain' />
                                        <Text style={styles.daytext}>{weatherData?.location.name}</Text>
                                    </View>
                                    <View style={[styles.weatherwidget, { backgroundColor: imageSources[0].color }]}>
                                        <FlatList
                                            data={weather}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={(item) => {
                                                return (
                                                    <View style={styles.location1}>
                                                        <Text style={styles.daydaytext}>{item.item.day}</Text>
                                                        <Image source={item.item.image} style={[styles.snow, { marginLeft: scaleWidth(3) }]} resizeMode='contain' />
                                                        {item.item.id !== weather?.length && <Divider style={styles.divider} />}
                                                    </View>
                                                )
                                            }} />
                                    </View>
                                </ImageBackground>
                            }
                        </>
                    }
                    {item.type === 'sender' &&
                        <>
                            <View style={{ maxWidth: '82%', flex: 1, alignSelf: 'flex-end' }}>
                                <View style={styles.bubblewrapperRightStyle}>
                                    <Text style={styles.bubbleRightTextStyle}>{item.message}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'flex-end' }}>
                                    <Image source={IMAGES.doubletick} style={styles.tick} />
                                    <Text style={styles.timestyle}>10.45 pm</Text>
                                </View>
                            </View>
                        </>
                    }
                </View>
            </Animatable.View>
        );
    });



    const handleVoiceSend = (data) => {
        if (data !== '') {
            const lowerCasedata = data?.toLowerCase();
            const matchedQuestion = manualQnA.find(item => item.question?.toLowerCase() === lowerCasedata);

            if (!matchedQuestion) {
                // If there's no exact match, perform fuzzy matching
                const matches = findBestMatch(lowerCasedata, manualQnA.map(item => item.question?.toLowerCase()));
                const bestMatch = matches.bestMatch;

                if (bestMatch.rating > 0.5) {
                    const matchedIndex = manualQnA.findIndex(item => item.question?.toLowerCase() === bestMatch.target);
                    const matchedQuestion = manualQnA[matchedIndex];
                    // If a question is matched, send the corresponding answer from manualQnA
                    setChatArray(prevChatArray => [
                        ...prevChatArray,
                        { type: 'sender', message: data },
                        { type: 'receiver', message: matchedQuestion.answer }
                    ]);
                }
                else {
                    // If no matching question found, send a generic response
                    setChatArray(prevChatArray => [
                        ...prevChatArray,
                        { type: 'sender', message: data },
                        { type: 'receiver', message: 'I\'m sorry, I couldn\'t understand. Can you please rephrase?' }
                    ]);
                }
            } else {
                // If a question is exactly matched, send the corresponding answer from manualQnA
                setChatArray(prevChatArray => [
                    ...prevChatArray,
                    { type: 'sender', message: data },
                    { type: 'receiver', message: matchedQuestion.answer }
                ]);
            }
        }
        setResult('');
    };

    const imageSources = [
        { image: IMAGES.Sunny, title: 'Sunny', color: '#A45465', smallimge: IMAGES.sun, degree: '36°', location: "Chennai", time: '23:56' },
        { image: IMAGES.Snow, title: 'Snow', color: '#2A5298', smallimge: IMAGES.smallSnow, degree: '16°', location: "Dubai", time: '01:16' },
        { image: IMAGES.Rain, title: 'Rainy', color: '#787ACF', smallimge: IMAGES.cloud, degree: '10°', location: "Doha", time: '12:05' },
        { image: IMAGES.Dark, title: 'Dark', color: '#2E63A9', smallimge: IMAGES.sun, degree: '30°', location: "Mumbai", time: '06:46' },
        { image: IMAGES.Breeze, title: 'Breeze', color: '#0081C2', smallimge: IMAGES.cloudsun, degree: '18°', location: "New Delhi", time: '03:36' },
    ];


    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const getWeather = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({
                "lat": 49.809,
                "lon": 16.787,
                "model": "gfs",
                "parameters": [
                    "wind",
                    "dewpoint",
                    "rh",
                    "pressure"
                ],
                "key": "qJqXzpMGKtCazPQ50Wb8Hf8V0qeKNwyL"
            });
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };
            fetch("https://api.windy.com/api/point-forecast/v2", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log("result", result))
                .catch((error) => console.error(error));
        } catch (error) {
            setError('Error fetching weather data');
        }
    };



    const Weather = async (city) => {
        if (city.trim() === '') {
            setError('Please enter a city name');
            return;
        }
        const cityName = city.replace(/^what\s+is\s+the\s+weather\s+in\s+/i, '').trim();
        const apiKey = '3aec67bab2dd42b0b9264334240103';
        try {
            const response = await axios.get(
                `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`
            );
            await setWeatherData(response.data);
            setError('');
        } catch (error) {
            setError('Error fetching weather data');
        }
    };
    const handleSend = () => {
        if (result !== '') {
            const lowerCaseResult = result?.toLowerCase();
            const matchedQuestion = manualQnA.find(item => item.question?.toLowerCase() === lowerCaseResult);

            if (!matchedQuestion) {
                // If there's no exact match, perform fuzzy matching
                const matches = findBestMatch(lowerCaseResult, manualQnA.map(item => item.question?.toLowerCase()));
                const bestMatch = matches.bestMatch;
                if (bestMatch.rating > 0.5) {
                    const matchedIndex = manualQnA.findIndex(item => item.question.toLowerCase() === bestMatch.target);
                    const matchedQuestion = manualQnA[matchedIndex];
                    // If a question is matched, send the corresponding answer from manualQnA
                    setChatArray(prevChatArray => [
                        ...prevChatArray,
                        { type: 'sender', message: result },
                        { type: 'receiver', message: matchedQuestion.answer }
                    ]);
                }
                else {
                    // If no matching question found, send a generic response
                    setChatArray(prevChatArray => [
                        ...prevChatArray,
                        { type: 'sender', message: result },
                        { type: 'receiver', message: 'I\'m sorry, I couldn\'t understand. Can you please rephrase?' }
                    ]);
                }
            } else {
                // If a question is exactly matched, send the corresponding answer from manualQnA
                setChatArray(prevChatArray => [
                    ...prevChatArray,
                    { type: 'sender', message: result },
                    { type: 'receiver', message: matchedQuestion.answer }
                ]);
            }
        }
        setResult('');
    };

    const flatListRef = useRef(null);

    // The effect that will always run whenever there's a change to the data
    React.useLayoutEffect(() => {
        const timeout = setTimeout(() => {
            if (flatListRef.current && data && data.length > 0) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };

    }, [data]);

    return (
        <>
            <StatusBar backgroundColor={COLORS.HEADER} />
            <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
                <ImageBackground source={IMAGES.chatbg} style={{ width: '100%', height: '100%' }}>
                    <CustomHeader title={'Sustain OS Sagesse'} navigation={navigation} icon={'menu'} />
                    <View style={{ marginBottom: scaleHeight(210) }}>
                        <FlatList
                            ref={flatListRef}
                            data={chatArray}
                            extraData={weatherData}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            ListHeaderComponent={
                                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                    <View style={styles.box}>
                                        <Text style={styles.timestyle}>{todayDate}</Text>
                                    </View>
                                </View>
                            }
                        />
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <FastImage style={[styles.animationIcon, { height: getImageSource() === IMAGES.animation7 ? scaleHeight(100) : scaleHeight(100) }]} resizeMode='contain' source={getImageSource()} />
                            {isRecording ?
                                <View style={styles.centermicView}>
                                    <FastImage source={IMAGES.animatedMic} style={styles.yellowmic} resizeMode='contain' />
                                </View>
                                :
                                <View style={styles.inputcontainer1}>
                                    <TextInput
                                        multiline={true}
                                        placeholder="Write your query"
                                        style={styles.writeplaceholderStyle1}
                                        placeholderTextColor={COLORS.BLACK}
                                        value={result}
                                        onChangeText={text => setResult(text)}
                                        selectionColor={COLORS.GREY}
                                        returnKeyType="send"
                                        scrollEnabled={false}
                                    />
                                </View>}
                            <View style={styles.iconView}>
                                <View style={styles.gallerybutton}>
                                    <TouchableOpacity style={styles.micView} onLongPress={startRecording} onPressOut={stopRecording}>
                                        <Image style={styles.sendIcon} resizeMode='contain' source={isRecording ? IMAGES.enablemic : IMAGES.mic} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.micView} onPress={() => { handleSend(), Weather(result) }}>
                                        <Image style={styles.sendIcon} resizeMode='contain' source={IMAGES.send} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                </ImageBackground>
            </View>
        </>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    headerstyle: {
        flexDirection: 'row',
        marginTop: scaleHeight(10),
        marginBottom: scaleHeight(10),
        marginHorizontal: scaleWidth(10),
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: COLORS.WHITE
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        right: Platform.OS === 'ios' ? scaleWidth(22) : scaleWidth(18)
    },
    roundIcon: {
        height: scaleHeight(42),
        width: scaleWidth(42),
        borderRadius: scaleWidth(100),
        borderColor: COLORS.ASH,
        borderWidth: scaleWidth(1),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: scaleWidth(10)
    },
    sendIcon: {
        height: scaleHeight(24),
        width: scaleWidth(24),
    },
    attachmentIcon: {
        height: scaleHeight(22),
        width: scaleWidth(22),
    },

    animationIcon: {
        height: scaleHeight(150),
        width: scaleWidth(143),
        left: scaleWidth(10),
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 15 },
        // shadowOpacity: 0.8,
        // shadowRadius: 30,  
        // elevation: 10,
    },
    iconView: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        height: scaleHeight(82),
        marginRight: scaleWidth(16),
        left: scaleWidth(-30),
        bottom: scaleHeight(10)
    },

    gallerybutton: {
        flex: 0.08,
        padding: scaleWidth(15),
        marginLeft: scaleHeight(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputcontainer1: {
        width: '60%',
        backgroundColor: COLORS.WHITE,
        borderWidth: scaleWidth(1),
        borderColor: COLORS.GREY,
        borderRadius: scaleWidth(15),
        opacity: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginHorizontal: scaleWidth(10),
        height: scaleHeight(90),
        left: scaleWidth(-30),
        bottom: scaleHeight(10)
    },
    centermicView: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        left: scaleWidth(-30),
    },
    writeplaceholderStyle1: {
        color: COLORS.LIGHT_BLACK,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '200',
        height: scaleHeight(50),
        width: '75%',
        marginHorizontal: scaleWidth(5)
    },
    bottomContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        position: 'absolute',
        zIndex: 1000,
        bottom: '0%',
        flex: 1,
    },
    roundIconcall: {
        height: scaleHeight(42),
        width: scaleWidth(42),
        borderRadius: scaleWidth(100),
        borderColor: COLORS.GREY,
        borderWidth: scaleWidth(1),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scaleWidth(10)
    },
    timestyle: {
        color: COLORS.ASH,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '500',
        marginHorizontal: scaleWidth(10),
        marginVertical: scaleHeight(2),
        lineHeight: scaleHeight(20),
    },
    box: {
        marginVertical: scaleHeight(15),
        backgroundColor: COLORS.GREY,
        borderRadius: scaleHeight(8)
    },
    personIconstyle: {
        width: scaleWidth(40),
        height: scaleHeight(40),
    },
    yellowmic: {
        width: scaleWidth(90),
        height: scaleHeight(90),
        top: scaleHeight(5),
    },
    messagecard: {
        marginHorizontal: scaleWidth(10),
        marginVertical: scaleWidth(5)
    },
    wrap: {
        flex: 0.8,
        width: '90%',
        marginLeft: scaleWidth(10)
    },
    messagecardtitle: {
        color: COLORS.LIGHT_BLACK,
        fontFamily: FONTS.NUNITOSANSBOLD,
        fontSize: normalizeFont(16),
        fontWeight: '700',
    },
    snowtext: {
        color: COLORS.WHITE,
        fontFamily: FONTS.NUNITOSANSBOLD,
        fontSize: normalizeFont(16),
        fontWeight: '700',
        marginLeft: scaleWidth(5)
    },
    daytext: {
        color: COLORS.WHITE,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(16),
        fontWeight: '600',
        textAlign: 'right'
    },
    daydaytext: {
        color: COLORS.WHITE,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(16),
        fontWeight: '600',
        marginLeft: scaleWidth(4)
    },
    degreetext: {
        color: COLORS.WHITE,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(50),
        fontWeight: '600',
        marginLeft: scaleWidth(5)
    },
    timetext: {
        color: COLORS.WHITE,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(24),
        fontWeight: '700',
        marginLeft: scaleWidth(5),
        textAlign: 'right'
    },
    messagecardsubtitle: {
        color: COLORS.GREY,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '500',
        marginLeft: scaleWidth(4),
        marginTop: scaleHeight(2)
    },
    bubblewrapperRightStyle: {
        backgroundColor: COLORS.MENUHEADER,
        borderTopLeftRadius: scaleHeight(30),
        borderTopRightRadius: scaleHeight(0),
        borderBottomLeftRadius: scaleHeight(30),
        borderBottomRightRadius: scaleHeight(30),
        alignContent: 'center',
        alignItems: 'center'
    },
    bubblewrapperLeftStyle: {
        backgroundColor: COLORS.WHITE,
        borderTopRightRadius: scaleHeight(30),
        borderBottomLeftRadius: scaleHeight(0),
        borderBottomRightRadius: scaleHeight(30),
        borderTopLeftRadius: scaleHeight(30),
        alignContent: 'center',
        alignItems: 'center'
    },
    bubbleRightTextStyle: {
        color: COLORS.WHITE,
        lineHeight: scaleHeight(20),
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '500',
        marginHorizontal: scaleWidth(10),
        marginVertical: scaleHeight(10),
    },
    bubbleLeftTextStyle: {
        color: COLORS.LIGHT_BLACK,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '500',
        marginHorizontal: scaleWidth(10),
        marginVertical: scaleHeight(10),
        lineHeight: scaleHeight(20),
    },
    bubbleLeftTextStyle1: {
        color: COLORS.LIGHT_BLACK,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '500',
        marginHorizontal: scaleWidth(10),
        lineHeight: scaleHeight(20),
        textAlign:'left'
    },
    tick: {
        marginHorizontal: scaleWidth(5),
        height: scaleWidth(16),
        width: scaleHeight(16),
        marginVertical: scaleHeight(5),
        tintColor: COLORS.BGCOLOR
    },
    genie: {
        height: scaleHeight(30),
        width: scaleWidth(30),
        marginRight: scaleWidth(10),
        alignSelf: 'baseline'
    },
    line: {
        width: scaleWidth(270),
        borderRadius: scaleWidth(20),
        marginBottom: scaleHeight(20)
    },

    micView: {
        height: scaleHeight(40),
        width: scaleWidth(40),
        marginBottom: scaleHeight(10),
        marginRight: scaleWidth(16),
        backgroundColor: COLORS.WHITE,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 10,
        borderRadius: scaleHeight(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgbg: {
        width: '99%',
        marginLeft: '15%',
        alignSelf: 'center',
        height: scaleHeight(170),
        marginVertical: scaleHeight(10),
    },
    imgbg1: {
        width: '95%',
        alignSelf: 'center',
        marginVertical: scaleHeight(10),
        backgroundColor: COLORS.WHITE,
        borderRadius: 2
    },
    degree: {
        flexDirection: 'row',
        marginLeft: scaleWidth(10)
    },
    degreeview: {
        flexDirection: 'row',
        marginHorizontal: scaleWidth(20),
        marginVertical: scaleHeight(10),
        justifyContent: 'space-between'
    },
    location: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: scaleWidth(30),
        bottom: scaleWidth(10)
    },
    location1: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    snow: {
        height: scaleHeight(20),
        width: scaleWidth(20),
    },
    weatherwidget: {
        height: scaleHeight(35),
        backgroundColor: '#A45465',
        width: '91%',
        alignItems: 'center',
        marginLeft: '4%',
    },
    divider: {
        backgroundColor: '#D07185',
        height: scaleHeight(20),
        width: 1,
        marginLeft: scaleWidth(4)
    },
    bar: {
        width: '95%',
        alignSelf: 'center',
        marginLeft: '15%',
    },
    heatmapbox: {
        marginTop: scaleHeight(20),
        borderRadius: scaleHeight(2),
        width: '90%',
        alignSelf: 'center',
        borderRadius: scaleHeight(2),
        flexDirection: 'row'
    },
    boxtitle: {
        fontSize: normalizeFont(18),
        fontWeight: '500',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.BGCOLOR,
        textAlign: 'left',
        alignSelf: 'flex-start',
        margin: scaleHeight(10),
    },
    boxtitle1: {
        fontSize: normalizeFont(16),
        fontWeight: '500',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.LIGHT_BLACK,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginHorizontal: scaleHeight(25),
    },
    boxtitle2: {
        fontSize: normalizeFont(12),
        fontWeight: '500',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.LIGHT_BLACK,
        textAlign: 'left',
        alignSelf: 'flex-start',
        margin: scaleHeight(5),
    },
    co2text: {
        fontSize: normalizeFont(20),
        fontWeight: '700',
        fontFamily: FONTS.NUNITOSANSBOLD,
        color: COLORS.BLACKK,
        textAlign: 'right',
        marginLeft: scaleWidth(60),
    },
    co2image: {
        height: scaleHeight(50),
    },
    icon: {
        height: scaleHeight(40),
        width: scaleWidth(40),
        bottom: scaleHeight(10),
    },
    box2: {
        borderRadius: 4,
        borderColor: COLORS.GREYBG,
        margin: scaleWidth(2),
        marginHorizontal: scaleWidth(6),
        backgroundColor: COLORS.GREYBG
    }
})
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import ButtonShare from '../components/ButtonShare';
import emptyStar from '../assets/star_corner.png';
import fullStar from '../assets/star_filled.png';

const CardEvent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const {item} = route.params;
  console.log('ITEM! EVENT DETAILS: --> ', item);
  const {
    time,
    image,
    name,
    location,
    startDate,
    endDate,
    paymentLimitDate,
    description,
    pricePerPerson,
    coments,
  } = item;
  const fakeMapImage =
    'https://map.viamichelin.com/map/carte?map=viamichelin&z=10&lat=38.11779&lon=13.35869&width=550&height=382&format=png&version=latest&layer=background&debug_pattern=.*';
  const dateNow = new Date();
  const eventDate = new Date(endDate);

  const Rating = () => {
    return (
      <View style={styles.ratingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <View>
              <Image
                style={styles.starImgStyle}
                source={item <= defaultRating ? fullStar : emptyStar}
              />
            </View>
          );
        })}
      </View>
    );
  };

  const renderItem = item => {
    const {userName, coment, vote} = item;
    return (
      <View style={styles.reviewWrapper}>
        <View style={{padding: 4}}>
          <Rating />
          <Text style={styles.nombreUsuario}>{userName}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textComent}>{coment}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.cardWrap}>
          <Image style={styles.image} source={{uri: image}} />

          <Text style={styles.title}>{name}</Text>

          <Text style={styles.text}> Empieza: {startDate?.split('T')[0]}</Text>
          <Text style={styles.text}>Termina: {endDate?.split('T')[0]}</Text>
          {paymentLimitDate ? (
            <Text style={styles.text}>
              Limite de confirmación: {paymentLimitDate?.split('T')[0]}
            </Text>
          ) : null}
          {/* DATES */}

          {/* <Ionicons name="phone" size={18} color="#900" style={styles.text} /> */}
          <Text style={styles.text}>Hora de inicio: {time} hs</Text>
          {/* <Ionicons name="phone" size={18} color="#900" style={styles.text} /> */}
          <Text style={styles.text}>
            Precio: ARS ${pricePerPerson ? pricePerPerson : 0}
          </Text>

          <View>
            {/* <Text style={styles.line}>─────────────────────────</Text> */}
            <Text style={styles.subtitle}>Descripción</Text>
            <Text style={styles.text}>{description}</Text>
          </View>

          <View>
            <Text style={styles.line}>─────────────────────────</Text>
            <Text style={styles.subtitle}>Ubicación</Text>
            <Text style={styles.text}>
              <Ionicons
                name="pin"
                style={{
                  color: '#208383',
                  fontSize: 20,
                }}
              />
              {location}
            </Text>
            <Image style={styles.mapImage} source={{uri: fakeMapImage}} />
          </View>

          <View>
            {/* <Text style={styles.line}>─────────────────────────</Text>
            <Text style={styles.subtitle}>Más eventos como este</Text>
            <Text style={styles.text}>--Carrousel--</Text> */}
          </View>

          {/* poner el button -fixed- at the buttom of the screen */}

          {/* <TouchableOpacity style={styles.buttonWrap}>
            <Text style={styles.button}>Compartir evento</Text>
          </TouchableOpacity> */}

          {eventDate.getTime() < dateNow.getTime() ? (
            <View style={styles.comentWrapper}>
              <Text style={styles.line}>─────────────────────────</Text>
              <Text style={styles.subtitle}>Dejá tu reseña</Text>
              <FlatList
                contentContainerStyle={{paddingTop: 40}}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={coments}
                renderItem={({item}) => renderItem(item)}
              />
            </View>
          ) : (
            <ButtonShare item={item} />
          )}
          {eventDate.getTime() < dateNow.getTime() ? (
            <TouchableOpacity
              style={styles.buttonWrap}
              onPress={() =>
                navigation.navigate('Comentarios', {id: item._id})
              }>
              <Text style={styles.button}>Dejá tu reseña</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  cardWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    margin: 4,
  },
  image: {
    marginTop: 30,
    width: 250,
    height: 360,
    borderRadius: 20,
  },
  mapImage: {
    marginTop: 30,
    width: 380,
    height: 250,
    borderRadius: 20,
  },
  buttonWrap: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#900',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 9,
    width: 300,
  },
  line: {
    color: 'grey',
  },
  button: {
    color: 'white',
    fontSize: 18,
  },
  comentWrapper: {
    margin: 0,
    width: '100%',
  },
  reviewWrapper: {
    width: 203,
    //height: 100,
    height: 250,
    marginHorizontal: 10,
    // padding: 2,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  nombreUsuario: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#B90303',
    marginTop: 5,
    marginLeft: 5,
  },
  textComent: {
    color: '#000000',
    margin: 1,
    marginLeft: 5,
  },
  starImgStyle: {
    marginTop: -10,
    marginRight: 12,
    width: 18,
    height: 18,
    resizeMode: 'cover',
  },
  ratingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
});

export default CardEvent;

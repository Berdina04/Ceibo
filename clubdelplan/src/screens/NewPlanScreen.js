import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import DateField from 'react-native-datefield';
import {Button, CheckBox, Icon} from 'react-native-elements';
import {Input} from 'react-native-elements';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {launchImageLibrary} from 'react-native-image-picker';

const NewPlanScreen = () => {
  const [text, onChangeText] = React.useState('');
  const [description, onChangeDescription] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [location, onChangeLocation] = React.useState('');
  const [date, setDate] = useState('');
  const [privadoCheck, setPrivadoCheck] = useState(false);
  const [image, setImage] = useState('https://via.placeholder.com/300x150');

  const formatDate = value => {
    const cutDate = value.toString().split(' ');

    const date = {
      day: cutDate[0],
      month: cutDate[1],
      dayNum: cutDate[2],
      year: cutDate[3],
    };

    setDate(date);
  };

  // SUBIR IMAGEN
  const selectImage = () => {
    const options = {
      title: 'Selecciona una imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        console.error(response.errorMessage);
      } else if (response.didCancel) {
        console.log('El usuario canceló');
      } else {
        const selectedImage = response.assets[0].uri;
        setImage(selectedImage);
      }
    });
  };

  // CATEGORIAS HARCODEADAS
  const data = [
    {label: 'Restaurante', value: 'restaurante'},
    {label: 'Cine', value: 'cine'},
    {label: 'Concierto', value: 'concierto'},
    {label: 'Fiesta', value: 'fiesta'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  // RENDER ITEMS CATEGORY DROPDOWN
  const renderItemCategory = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const onSubmit = () => {
    const newPlan = {
      name: text,
      description,
      location,
      date,
      privado: privadoCheck,
      category,
      image,
    };
    console.log(newPlan);
  };

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 100,
        }}>
        <Input
          label={'Nombre'}
          placeholder={'Dale un nombre a tu plan..'}
          onChangeText={onChangeText}
          value={text}
        />

        <Input
          multiline
          // numberOfLines={2}
          label={'Descripcion'}
          onChangeText={onChangeDescription}
          placeholder="Los detalles que quieras aclarar sobre tu plan.."
          value={description}
        />

        {/* CATEGORY DROPDOWN */}
        <Text style={styles.inputLabel}>Elegí la categoría</Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Categorias"
          value={category}
          onChange={item => {
            setCategory(item.value);
          }}
          renderItem={renderItemCategory}
        />
        {/* CATEGORY DROPDOWN */}

        <Input
          onChangeText={onChangeLocation}
          placeholder={'Donde se van a encontrar?'}
          label={'Ubicación'}
          value={location}
        />
        {/* fecha input */}
        <View style={{justifyContent: 'center'}}>
          <DateField labelDate="Dia" labelMonth="Mes" labelYear="Año" />
          <DateField
            defaultValue={new Date()}
            styleInput={{fontSize: 15}}
            onSubmit={value => formatDate(value)}
            // containerStyle={{marginVertical: 10}}
          />
        </View>
        {/* fecha input */}
        <View>
          <Button title={'Seleccionar imagen'} onPress={selectImage} />
          <Image style={{width: 300, height: 150}} source={{uri: image}} />
        </View>
        <CheckBox
          containerStyle={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
          iconRight
          center
          title="Mi evento es publico"
          checked={privadoCheck}
          onPress={() => setPrivadoCheck(!privadoCheck)}
        />
        {privadoCheck && (
          <Text style={{fontSize: 10, padding: 5}}>
            (Todo el mundo podrá ver tu evento)
          </Text>
        )}
        <TouchableOpacity style={styles.btnCrearPlan} onPress={onSubmit}>
          <Text style={{color: 'white', textAlign: 'center'}}>Crear Plan</Text>
          <Ionicons style={styles.btnIcon} name="checkmark-outline"></Ionicons>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tittle: {color: 'black', textAlign: 'center', fontSize: 20, marginBottom: 50},
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#111',
  },
  btnCrearPlan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#900',
    width: 300,
    // width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  btnIcon: {
    color: 'white',
    fontSize: 20,
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',

    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default NewPlanScreen;

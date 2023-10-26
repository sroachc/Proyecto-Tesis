import { Picker } from "@react-native-picker/picker";

const Comunas = ({ selectedCategory, onCategoryChange }) => {
    return (
        <Picker
      selectedValue={selectedCategory}
      onValueChange={onCategoryChange}
      style={styles.picker}
    >
      <Picker.Item label="Selecciona una Comuna" value="" />
      <Picker.Item label="comuna 1" value="categoria1" />
      <Picker.Item label="comuna  2" value="categoria2" />
      
    </Picker>

    );
}

const styles = {
        picker: {
          width: '80%',
          height: 50,
          marginTop: 20,
          borderWidth: 1,
          borderColor: 'gray',
          backgroundColor: '#D8D8D8',
          borderRadius: 30,
          paddingStart: 10,
        }
      };
      
export default Comunas;

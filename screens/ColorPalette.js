import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import ColorBox from '../component/ColorBox';

const ColorPalette = ({ route }) => {
    const { colors, paletteName } = route.params;
    return (


        <FlatList
            style={styles.container}
            data={colors}
            keyExtractor={item => item.hexCode}
            renderItem={({ item }) => (
                <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
            )}
            ListHeaderComponent={<Text style={styles.Text}> {paletteName}</Text>}

        />

    );
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    box: {
        padding: 10,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
});
export default ColorPalette;
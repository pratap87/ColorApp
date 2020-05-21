import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import PalettePreview from '../component/PalettePreview';
import AddNewPaletteModal from '../screens/ColorPaletteModal';

const URL = 'https://color-palette-api.kadikraman.now.sh/palettes';

const Home = ({ navigation, route }) => {
    const newPalette = route.params ? route.params.newPalette : null;
    const [palettes, setPalettes] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleFetchPalettes = useCallback(async () => {
        const response = await fetch(URL);
        if (response.ok) {
            const palettes = await response.json();
            setPalettes(palettes);
        }
    }, []);
    useEffect(() => {
        handleFetchPalettes();
    }, []);
    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await handleFetchPalettes();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000)

    });

    useEffect(() => {
        if (newPalette) {
            setPalettes(palettes => [newPalette, ...palettes])
        }
    }, [newPalette])
    return (
        <FlatList
            style={styles.List}
            data={palettes}
            keyExtractor={item => item.paletteName}
            renderItem={({ item }) => (
                <PalettePreview
                    onPress={() => navigation.push('ColorPalette', item)}
                    palette={item}
                />

            )}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            ListHeaderComponent={
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AddNewPalette')}
                >
                    <Text style={styles.buttonText}>Add a color scheme</Text>
                </TouchableOpacity>}
        />
    );
};
const styles = StyleSheet.create({
    List: {
        padding: 10,
        backgroundColor: 'azure',
    },
    button: {
        height: 50,
        backgroundColor: 'white',
        padding: 10,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'teal',
    },
})
export default Home;
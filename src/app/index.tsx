import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const books = [
  { id: '1', title: 'Harry Potter', author: 'J.K. Rowling', category: 'Fantasy' },
  { id: '2', title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy' },
  { id: '3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic' },
  { id: '4', title: 'Wonder', author: 'R.J. Palacio', category: 'Fiction' },
  { id: '5', title: 'Matilda', author: 'Roald Dahl', category: 'Children' },
  { id: '6', title: 'The Hunger Games', author: 'Suzanne Collins', category: 'Adventure' },
];

export default function LibraryApp() {
  const [search, setSearch] = useState('');
  const [borrowed, setBorrowed] = useState<string[]>([]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  const borrowBook = (id: string) => {
    setBorrowed(current =>
      current.includes(id)
        ? current.filter(bookId => bookId !== id)
        : [...current, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>📚 My Library</Text>
        <Text style={styles.subtitle}>Your world of books</Text>
      </View>

      <View style={styles.welcome}>
        <Text style={styles.welcomeTitle}>Welcome to your library!</Text>
        <Text style={styles.welcomeText}>
          Discover your next favourite book.
        </Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search books or authors..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available Books</Text>
        <Text style={styles.count}>{filteredBooks.length} books</Text>
      </View>

      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No books found.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.bookCard}>
            <Text style={styles.bookIcon}>📖</Text>

            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                borrowed.includes(item.id) && styles.returnButton,
              ]}
              onPress={() => borrowBook(item.id)}
            >
              <Text style={styles.buttonText}>
                {borrowed.includes(item.id) ? 'Return' : 'Borrow'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Books borrowed: {borrowed.length}
        </Text>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1EA',
  },
  header: {
    backgroundColor: '#244C3A',
    padding: 24,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: '#D9E8DC',
    marginTop: 5,
  },
  welcome: {
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#244C3A',
  },
  welcomeText: {
    color: '#666',
    marginTop: 6,
  },
  search: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#244C3A',
  },
  count: {
    color: '#777',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  bookCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookIcon: {
    fontSize: 32,
    marginHorizontal: 12,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    color: '#777',
    marginTop: 4,
  },
  category: {
    color: '#47765A',
    marginTop: 4,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#244C3A',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  returnButton: {
    backgroundColor: '#777',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    color: '#777',
    padding: 30,
  },
  footer: {
    padding: 15,
    backgroundColor: '#244C3A',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

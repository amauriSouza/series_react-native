import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FormRow = props => {
  const { children } = props;
  return (
      <View style={styles.formRow}>{children}</View>

  );
};

const styles = StyleSheet.create({
  formRow: {
    padding: 5,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    alignItems: 'center',
    marginBottom: 10
  },
});
export default FormRow;

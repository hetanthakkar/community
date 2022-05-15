import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

export default class Typography extends Component {
  render() {
    const {
      h1,
      h2,
      h3,
      title,
      body,
      caption,
      small,
      size,
      // styling
      bold,
      semibold,
      light,
      center,
      right,
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      style,
      children,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: size },
      bold && styles.bold,
      semibold && styles.semibold,
      light && styles.light,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && { color },
      // color shortcuts
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      style, // rewrite predefined styles
    ];

    return (
      <Text style={textStyles} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  // default style
  text: {
    // fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: "black",
  },
  // variations
  bold: {
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
  },
  semibold: {
    fontWeight: "500",
    fontFamily: "Montserrat-SemiBold",
  },
  light: {
    fontWeight: "200",
    fontFamily: "Montserrat-Light",
  },
  // position
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  // colors
  white: { color: "#f8fafd" },
  // fonts
  h1: { fontFamily: "Montserrat-Bold", fontSize: 32 },
  h2: { fontFamily: "Montserrat-Bold", fontSize: 26 },
  h3: { fontFamily: "Montserrat-Bold", fontSize: 18 },
  caption: { fontSize: 12 },
});

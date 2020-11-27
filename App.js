import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import AudioPlayer from 'react-native-play-audio';
console.disableYellowBox = true;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      randomeNumberArr: []
    };
  }

  createBoxes = (numberOfBoxes) => {
    let boxes = [];
    for (let i = 1; i <= numberOfBoxes; i++) {
      boxes.push(
        <View
          key={i}
          style={this.state.randomeNumberArr.includes(i) ? styles.boxHighlited : styles.box}
        >
          {
            this.state.randomeNumberArr.includes(i) ? <Text style={styles.textStyle}>{i}</Text> : <Text></Text>
          }
        </View>
      );
    }
    return boxes;
  };

  randomNumberGen = () => {
    let randomNumber = [];
    do {
      let num = Math.floor(Math.random() * 80 + 1);
      randomNumber.push(num);
      randomNumber = randomNumber.filter((item, index) => {
        return randomNumber.indexOf(item) === index
      });
    } while (randomNumber.length < 20);

    this.setState({
      randomeNumberArr: randomNumber
    });
  }


  // printRandomNumbersWithIterval = ()=> {
  //   var interval = 1000;
  //   this.state.randomeNumberArr.forEach(function (item, index) {
  //     setTimeout(function () {
  //       console.log(item);
  //     }, index * interval);
  //   });
  // }


  randomNumberList() {
    let arr = this.state.randomeNumberArr;

    return arr.map((data) => {

      AudioPlayer.prepareWithFile('pop', 'mp3', () => AudioPlayer.play());
      return (
        <View style={styles.randomNumberView}><Text style={styles.textStyle}>{data}</Text></View>
      )
    })
  }

  render() {
    let totalBox = 80;
    return (
    <>
      <View style={styles.container}>
        {
        this.createBoxes(totalBox)
        }
      </View>
      <View style={styles.randomNumberContainer}>
        {
          this.randomNumberList()
        }
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          onPress={() => {
            this.randomNumberGen()
          }}
          title="PLAY"
          color="#841584"
        /></View>
    </>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  randomNumberContainer: {
    marginTop: 20,
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  box: {
    width: "9%",
    height: 25,
    margin: '0.5%',
    aspectRatio: 1,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 5
  },
  boxHighlited: {
    width: "9%",
    height: 25,
    margin: '0.5%',
    padding: '1%',
    aspectRatio: 1,
    backgroundColor: "#bce6eb",
    borderWidth: 0.5,
    borderRadius: 5
  },
  randomNumberView: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: .5,
    margin: 4,
    padding: 4,
    backgroundColor: 'lightgrey'
  },
  textStyle:{
    textAlign: 'center'
  }
});

export default App;
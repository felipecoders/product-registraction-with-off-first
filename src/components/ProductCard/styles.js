import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin: 10px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 300px;
`;

export const Content = styled.View`
  width: 100%;
  padding: 10px;
`;

export const InfoContent = styled.View`
  padding-bottom: 10px;
`;

export const ExtraContent = styled.View.attrs({
  borderTopColor: 'rgba(0, 0, 0, 0.1)',
  borderTopWidth: 1,
})`
  padding-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  padding: 4px 0;
`;

export const Description = styled.Text`
  font-size: 12px;
  padding: 5px 0;
`;

export const Footer = styled.View`
  flex-direction: row;
`;

export const Amount = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const Price = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  height: 40px;
  background: ${prop => prop.background};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

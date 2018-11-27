import styled from 'styled-components';
import { Box, BoxProps } from 'rebass';

const Container: React.FunctionComponent<BoxProps> = styled(Box)`
  max-width: 200px;
`;

Container.defaultProps = {
  p: 2
};

export default Container;

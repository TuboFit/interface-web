import { experimentalStyled as styled } from "@material-ui/core/styles";

export const Container = styled("div")`
  margin-top:12px;
  border-radius:8px;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  padding: ${({ theme }) => theme.spacing(6)};
  gap: ${({ theme }) => theme.spacing(0.5) + " " + theme.spacing(2)};
`;

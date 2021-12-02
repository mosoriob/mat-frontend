import { Button} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Directive} from "../types/mat";

interface Props {
  directive: Directive;
}
const DirectiveItem = (props: Props) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={2} md={8}>
        <Box key={props.directive.id}>{props.directive.command}</Box>
      </Grid>
      <Grid item xs={2} md={4}>
        {
          //TODO: add button to delete directive
          //TODO: create a component to select the parameter
        }
        <Button onClick={() => console.log("dummy")}>Add directive</Button>
      </Grid>
    </Grid>
  );
};

export default DirectiveItem;

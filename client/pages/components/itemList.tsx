import IItemView from "@local/shared/view-models/item";
import { IconButton, ListItemText, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import ICartView from "../../utils/interfaces/cartview";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function ItemList({
  data,
  allowDelete = false,
}: {
  data: ICartView;
  allowDelete?: boolean;
}) {
  const classes = useStyles();

  const getTotal = () => {
    let total = 0;
    if (data) {
      let keys = Object.keys(data) as Array<keyof ICartView>;
      keys.forEach((item) => {
        if (data[item]) {
          let x = data[item]!;

          (x as IItemView[]).forEach((item) => {
            if (item.amount) {
              total += item.amount;
            }
          });
        }
      });
    }
    return total;
  };

  const amountToString = (amount: number) => {
    return "$" + (amount / 100).toFixed(2);
  };

  return (
    <List disablePadding>
      {data?.donation?.map((item, index) => {
        return (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText
              primary="Donation"
              secondary={item.donor.firstName + " " + item.donor.lastName}
            />
            <Typography variant="body2">
              {amountToString(item.amount || 0)}
            </Typography>
            {allowDelete ? (
              <IconButton
                aria-label="delete"
                className={classes.margin}
                // onClick={deleteItem}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            ) : null}
          </ListItem>
        );
      })}

      {data?.registration?.map((item, index) => {
        return (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText
              primary="Tournament Registration"
              secondary={`${item.players.length} player${
                item.players.length > 1 ? "s" : ""
              }`}
            />
            <Typography variant="body2">
              {amountToString(item.amount || 0)}
            </Typography>
            {allowDelete && (
              <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="large" />
              </IconButton>
            )}
          </ListItem>
        );
      })}

      <ListItem className={classes.listItem}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" className={classes.total}>
          {amountToString(getTotal())}
        </Typography>
      </ListItem>
    </List>
  );
}

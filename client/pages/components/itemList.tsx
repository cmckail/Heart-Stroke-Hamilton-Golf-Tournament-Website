/*
  Item List contains all of the items added to cart and is used to display them
*/

import IItemView from "@local/shared/view-models/item";
import { IconButton, ListItemText, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import SessionUserData from "@local/shared/view-models/session";
import axios from "../../utils/axios";

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
  reloadCart,
}: {
  data: SessionUserData;
  allowDelete?: boolean;
  reloadCart?: (mounted: boolean) => void;
}) {
  const classes = useStyles();

  const getTotal = () => {
    let total = 0;
    if (data) {
      let keys = Object.keys(data) as Array<keyof SessionUserData>;
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

  /* Used to delete an item from the list */
  const deleteItem = async (id: string) => {
    let res = await axios.delete("/cart/" + id);
    if (res.status < 400) reloadCart!(true);
  };

  /* Used to convert amount to a string value*/
  const amountToString = (amount: number) => {
    return "$" + (amount / 100).toFixed(2);
  };

  /* The JSX for the list, which is primarily just mapped from the data and registration */
  return (
    <List disablePadding>
      {data?.donation?.map((item, index) => {
        return (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText
              primary="Donation"
              secondary={
                item.sponsorAHole ? "Sponsor a Hole" : "One-Time Donation"
              }
            />
            <Typography variant="body2">
              {amountToString(item.amount || 0)}
            </Typography>
            {allowDelete ? (
              <IconButton
                aria-label="delete"
                className={classes.margin}
                onClick={() => deleteItem(item.id!)}
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

      {/* The total amount displayed at the end */}
      <ListItem className={classes.listItem}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" className={classes.total}>
          {amountToString(getTotal())}
        </Typography>
      </ListItem>
    </List>
  );
}

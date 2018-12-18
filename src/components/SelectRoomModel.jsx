import React from 'react';
import PropTypes from 'prop-types';
import * as roomDetails from "../roomDetails";
import { Dialog, RadioButton, RadioGroupDumb as RadioGroup } from "lucid-ui";
import _ from 'lodash';

function SelectRoomModel({ isOpen, onSelect }) {
  const rooms = _.keys(roomDetails);
  return (
    <div>
      <Dialog
        isShown={isOpen}
        Header="Select a room"
        size="small"
      >
        <RadioGroup
          onSelect={(index) => {
            onSelect(rooms[index]);
          }}
          selectedIndex={null}
          style={{
          display: 'inline-flex',
          flexDirection: 'column',
        }}>
          {_.map(rooms, room => (
              <RadioGroup.RadioButton>
                <RadioGroup.Label>{room}</RadioGroup.Label>
              </RadioGroup.RadioButton>
          ))}
        </RadioGroup>



        {_.map(rooms, room => {

        })}
      </Dialog>
    </div>
  );
}

SelectRoomModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SelectRoomModel;
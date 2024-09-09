import React, { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';

type RenameModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  newName: string;
  onRename: () => void;
  setNewName: Dispatch<SetStateAction<string>>;
};

const RenameModal = ({ open, setOpen, newName, onRename, setNewName }: RenameModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Conversation</DialogTitle>
        </DialogHeader>
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder='Enter new conversation name'
        />
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onRename}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;

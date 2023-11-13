#!/bin/bash

if [ $# -lt 2 ]
then
  echo "usage: create-component.sh [working-directory] [ComponentName]"
  exit 0
fi

working_dir=$1
component_name=$2

set -x

COMPONENT_DIR=$working_dir/$component_name
INDEX_FILE=$working_dir/$component_name/index.ts
COMP_FILE=$working_dir/$component_name/$component_name.tsx
SCSS_FILE=$working_dir/$component_name/$component_name.module.scss

mkdir $COMPONENT_DIR
touch $INDEX_FILE
touch $COMP_FILE
touch $SCSS_FILE

# Index: insert export default of component
cat > $INDEX_FILE <<- EOM
import $component_name from './$component_name';

export default $component_name;
EOM


# Style: insert base class name
cat > $SCSS_FILE <<- EOM
.$component_name {
}

EOM

# Component: insert react component code
cat > $COMP_FILE <<- EOM
import cx from 'classnames';
import React, { FC } from 'react';
import styles from './$component_name.module.scss';

export interface Props {
  /* ...proptypes */
}

const $component_name: FC<Props> = () => (
  <div className={cx(styles.$component_name)}>
    $component_name
  </div>
);

$component_name.displayName = '$component_name';

export default $component_name;
EOM


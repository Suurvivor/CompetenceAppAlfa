import React from 'react';
import Tree from 'react-hierarchy-tree-graph';

const TreeView = () => {
   const myTreeData = [
      {
         name: 'Top Level',
         attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
         },
         children: [
            {
               name: 'Level 2: A',
               attributes: {
                  keyA: 'val A',
                  keyB: 'val B',
                  keyC: 'val C',
               },
            },
            {
               name: 'Level 2: B',
               children: [
                  {
                     name: 'Level 2: A',
                     attributes: {
                        keyA: 'val A',
                        keyB: 'val B',
                        keyC: 'val C',
                     },
                  },
                  {
                     name: 'Level 2: B',
                  },
                  {
                     name: 'Level 2: A',
                     attributes: {
                        keyA: 'val A',
                        keyB: 'val B',
                        keyC: 'val C',
                     },
                  },
                  {
                     name: 'Level 2: B',
                  },
               ],
            },
            {
               name: 'Level 2: A',
               attributes: {
                  keyA: 'val A',
                  keyB: 'val B',
                  keyC: 'val C',
               },
               children: [
                  {
                     name: 'Level 2: A',
                     attributes: {
                        keyA: 'val A',
                        keyB: 'val B',
                        keyC: 'val C',
                     },
                  },
                  {
                     name: 'Level 2: B',
                  },
                  {
                     name: 'Level 2: A',
                     attributes: {
                        keyA: 'val A',
                        keyB: 'val B',
                        keyC: 'val C',
                     },
                  },
                  {
                     name: 'Level 2: B',
                  },
               ],
            },
            {
               name: 'Level 2: B',
               children: [
                  {
                     name: 'Level 2: A',
                     attributes: {
                        keyA: 'val A',
                        keyB: 'val B',
                        keyC: 'val C',
                     },
                  },
                  {
                     name: 'Level 2: B',
                  },
                  {
                     name: 'Level 2: A',
                     attributes: {
                        keyA: 'val A',
                        keyB: 'val B',
                        keyC: 'val C',
                     },
                  },
                  {
                     name: 'Level 2: B',
                  },
               ],
            },
         ],
      },
   ];
   return (
      <div>
         <div id='treeWrapper' className='treeViewContainer' style={{ width: '100vh', height: '100vh' }}>
            <Tree data={myTreeData} orientation='vertical' pathFunc='elbow' collapsible={false} />
         </div>
      </div>
   );
};

export default TreeView;

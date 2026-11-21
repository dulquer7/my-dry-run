import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://gqykfzkppejplboxduor.supabase.co',
  'sb_publishable_aehEc6tMFJnl2VKLsQr8fA_N-HXzjmx'
);

export default function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data } = await supabase.from('items').select('*').order('id', { ascending: false });
    if (data) setItems(data);
  }

  async function addItem(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await supabase.from('items').insert([{ name: text }]);
    setText('');
    fetchItems();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">15-Min Dry Run</h1>

        <form onSubmit={addItem} className="flex gap-2 mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add an item..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
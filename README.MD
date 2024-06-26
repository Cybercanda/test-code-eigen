## API LIBRARY FOR TEST PT EIGEN

Base URL
```base url
http://localhost:3000/api/
```

Swagger API
```base url
http://localhost:3000/api-docs/#/
```

## Algoritma
1. Reverse Alphabet (Javascript)
    ```javascript
    let x = "NEGIE1"
    let terbalik = x.split("").reverse().join("")
    
    console.log(terbalik)
    ```
2. Longest sentence (Python)
    ```python
    def terpanjang(kalimat):
        kata = kalimat.split()
        kata_terpanjang = max(kata, key=len)
    
        return kata_terpanjang
        
    kalimat = "Saya sangat senang mengerjakan soal algoritma"
    
    print(terpanjang(kalimat))
    ```
3. Count_kejadian (Python)
   ```
   def count_kejadian(input_list, query_list):
    return [input_list.count(query) for query in query_list]
    
   INPUT = ['xc', 'dz', 'bbb', 'dz']
   QUERY = ['bbb', 'ac', 'dz']
   
   output = count_kejadian(INPUT, QUERY)
   print(output)
   ```
4. Matrix (Python)
   ```py
   def diagonal_difference(matrix):
    n = len(matrix)
    primary_diagonal = sum(matrix[i][i] for i in range(n))
    secondary_diagonal = sum(matrix[i][n - 1 -i] for i in range(n))
    return abs(primary_diagonal - secondary_diagonal)
    
   matrix = [
   [1, 2, 0],
   [4, 5, 6],
   [7, 8, 9]
   ]
   
   result = diagonal_difference(matrix)
   print(result)
   ```
   
Untuk full source code algoritma, bisa di refer di link berikut:
[Algoritma PT EIGEN](https://github.com/Cybercanda/algoritma-PT-Eigen)

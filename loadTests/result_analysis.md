#### Overview

The load test was conducted on the `https://petstore.swagger.io/v2` API for **5 minutes** with **200 Virtual Users (VUs)**. The objective was to evaluate the performance of user management operations under heavy load, focusing on **Create**, **Search**, **Modify**, and **Delete** operations.

---

### Key Results

- **Total Iterations Completed**: 11,260
- **Total Requests**: 67,560
- **Success Rate**: **99.62%** of checks passed (168,268 out of 168,900)
- **Failure Rate**: **17.25%** of requests failed (11,656 out of 67,560)

### Detailed Operation Results

1. **Create User**:

   - **Status**: 100% Success
   - **Response Time**: <500ms
   - **ID Matches**: Passed

2. **Search User**:

   - **Status**: 98% Success (11147/11360 passed)
   - **Response Time**: <500ms
   - **User Details**: 98% Success (11147/11360 passed)

3. **Modify User**:

   - **Status**: 100% Success
   - **Response Time**: <500ms

4. **Search Modified User**:

   - **Status**: 98% Success (11145/11360 passed)
   - **First Name Updated**: 98% Success (11145/11360 passed)

5. **Delete User**:

   - **Status**: 98% Success (11088/11360 passed)
   - **Response Time**: <500ms

6. **Verify User Deletion**:
   - **Status**: 99% Success (11256/11360 passed)
   - **Response Time**: <500ms

---

### Performance Metrics

1. **Average Request Duration**: `64.11 ms`

   - **90th Percentile**: `74.26 ms`
   - **95th Percentile**: `76.48 ms`
   - **Max Request Duration**: `333.13 ms`

2. **Request Throughput**: `221.2 requests/second`

3. **HTTP Failures**: **17.25%** (11,656 requests failed out of 67,560)

   - The failure rate is significant and suggests that the API struggled with the load at certain times.

4. **Data Transferred**:

   - **Data Sent**: 7.7 MB
   - **Data Received**: 25 MB

5. **TCP and Connection Metrics**:
   - **Connection Time**: `1.03 ms` (avg)
   - **TLS Handshake Time**: `561.83 µs` (avg)
   - **Waiting Time**: `63.86 ms` (avg)

---

### Observations

1. **High Success Rate**:
   - Overall, **99.62%** of checks passed, indicating that the API handled most requests correctly.
2. **Significant Failure Rate**:

   - Despite the high success rate, **17.25%** of requests failed. This is a notable issue and suggests possible server overload or timeouts under high load.

3. **Search and Delete Failures**:

   - The **Search User** and **Delete User** operations had a **2%** failure rate, which could indicate performance bottlenecks in these endpoints.

4. **Response Time**:
   - Response times were generally good, with an average of **64.11 ms** and **95%** of requests completing in under **76.48 ms**.

---

### Recommendations

1. **Investigate Failure Rate**:

   - The **17.25% failure rate** needs to be investigated, focusing on potential server-side issues such as timeouts, resource exhaustion, or overload.

2. **Optimize Search and Delete Endpoints**:

   - The **Search** and **Delete** operations showed slightly higher failure rates. Consider optimizing these endpoints, perhaps by improving database indexing or reviewing resource limits.

3. **Scale Server Resources**:
   - If expecting sustained high traffic, consider scaling up server resources (CPU, memory) to reduce failure rates and maintain performance under load.

---

### Conclusion

The API demonstrated good performance overall, with low response times and high throughput. However, the **17.25% failure rate** under heavy load is a concern and should be addressed through further investigation and optimization of the API’s infrastructure and endpoints.
